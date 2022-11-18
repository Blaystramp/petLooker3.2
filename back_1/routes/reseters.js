const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
require('dotenv').config()
const sendEmailpass = require('../utils/emailPass')

const bcrypt = require('bcrypt')




router.post ('/api/user/forgot-password' , async (req,res) => {
    let { email } = req.body;
    try {
        let  emlUser = await User.findOne({ email });
        console.log(emlUser)
        if (!emlUser) {
            return res.json({status:"Usuario no existe"});
        }
        const secret = process.env.jwtSecret + emlUser.password;
        console.log(secret);

        const token = jwt.sign({email:emlUser.email, id:emlUser._id}, secret,{expiresIn: "5m",});
        console.log(token);

        const link = `http://localhost:3000/api/user/reset-password/${emlUser._id}/${token}`;

        
        console.log(link);

        const toEmail = emlUser.email;

        sendEmailpass(link, toEmail);
        res.json({link});

    } catch (error) {}
})

router.get ("/api/user/reset-password/:id/:token" , async (req,res) => {
    const {id,token} = req.params;
    console.log (req.params);
    const emlUser = await User.findOne({ _id: id });
        if (!emlUser) {
            return res.json({status:"Usuario no existe"});
        }
        const secret = process.env.jwtSecret + emlUser.password;
        try {
            const verify = jwt.verify (token, secret);
            res.render("index",{email:verify.email, status: "Not verify"});
        } catch (error){
            res.send ("Not verify")
        }

})

router.post ("/api/user/reset-password/:id/:token" , async (req,res) => {
    const {id,token} = req.params;
    const {password} = req.body;
    
    const emlUser = await User.findOne({ _id: id });
        if (!emlUser) {
            return res.json({status:"Usuario no existe"});
        }
        const secret = process.env.jwtSecret + emlUser.password;
        try {
            const verify = jwt.verify (token, secret);
            const encryptedPassword = await bcrypt.hash(password,10);
            await User.updateOne(
                {
                    _id: id,
                  },
                  {
                    $set: {
                      password: encryptedPassword,
                    },
                  }
                );
            res.render("index", { email: verify.email, status: "verified" });
        } catch (error){
            res.send ("algo salió mal")
        }

})

module.exports = router;