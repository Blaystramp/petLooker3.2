const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const sendEmail = require('../../utils/index')

const Admin = require('../../model/adminModel')

router.post('/api/admin/login',

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
    let user = await Admin.findOne({ email })
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