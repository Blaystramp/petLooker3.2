const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const sendEmail = require('../../utils/index')

const User = require('../../model/userModel')

// @route    GET api/user/register
// @desc     sign up user
// @access   Public

router.post('/api/user/register', [
  check('name', 'Nombre necesario')
    .not()
    .isEmpty(),
  check('email', 'Por favor, incluya un email válido').isEmail(),
  check(
    'password',
    'Por favor, ingrese contraseña con 6 o más caracteres'
  ).isLength({ min: 6 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });


      if (user && user.isVerified === false) {
        const code = Math.floor(100000 + Math.random() * 900000)
        const toEmail = email
        const salt = await bcrypt.genSalt(10);
        let newCode = await bcrypt.hash(code.toString(), salt)
        user.verificationCode = newCode
        await user.save()
        sendEmail(code, toEmail);
        return res.status(201).json({
          email: user.email,
          msg: "Ya estás registrado, revisa tu email por un nuevo código de verificación"
        })
      }

      if (user) {
        return res
          .status(200)
          .json({
            msg: 'Usuario ya existente'
          });
      }

      const code = Math.floor(100000 + Math.random() * 900000)
      const toEmail = email

      user = new User({
        name,
        email,
        password,
        verificationCode: code
      });

      sendEmail(code, toEmail);

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      user.verificationCode = await bcrypt.hash(code.toString(), salt)

      await user.save();

      res.status(201).json({
        email,
        msg: 'Por favor, revisa tu email y verifica tu cuenta'
      })
    } catch (err) {
      res.json({
        msg: "Algo salió mal"
      })
    }
  })


// @route    put api/user/verify
// @desc     verify user
// @access   private

router.put('/api/user/verify', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email) {
      return res.json({
        msg: "Por favor, ingrese un email"
      })
    }
    if (!code) {
      return res.json({
        msg: "Por favor, ingrese su código"
      })
    }
    let user = await User.findOne({ email: email })

    if (!user) {
      return res.json({
        msg: 'Usuario no encontrado'
      })
    }
    if (user.isVerified) {
      return res.json({ msg: "Tu cuenta ya está verificada" })
    }
    const isMatch = await bcrypt.compare(code.toString(), user.verificationCode);


    if (!isMatch) {
      return res.json({
        msg: 'Código inválido'
      });
    }
    user.isVerified = true;

    await user.save()
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign({
      payload
    }, process.env.jwtSecret, { expiresIn: '7d' });
    res.status(201).json({
      token,
      msg: "Verificación exitosa"
    })
  } catch (err) {
    res.json({
      msg: "Algo salió mal"
    })
  }
})


// @route    post api/user/login
// @desc     log in user
// @access   public

router.post('/api/user/login',
  [
    check('email', 'Por favor, incluya un email válido').isEmail(),
    check(
      'password',
      'Por favor, ingrese contraseña con 6 o más caracteres'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    try {
      let { email, password } = req.body
      let user = await User.findOne({ email })
      if (!user) {
        return res.json({
          msg: "Usuario no existe"
        })
      }
      if (!user.isVerified) {
        return res.json({
          msg: 'No eres un usuario verificado'
        })
      }
      const isMatchPasswod = await bcrypt.compare(password, user.password)
      if (!isMatchPasswod) {
        return res.json({
          msg: "Credencial inválida"
        })
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign({
        payload
      }, process.env.jwtSecret, { expiresIn: '7d' });
      res.status(201).json({
        token,
        msg: 'Estás logueado'
      });
    } catch (err) {
      res.json({
        msg: "Algo salió mal"
      })
    }

  })

module.exports = router;