const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { application } = require('express')
require('dotenv').config()






// get user profile
const getProfile = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById(id).select('-password').select('-verificationCode')
        res.json(user)
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// update user phone
const updatePhone = async (req, res) => {
    try {
        const { id } = req.user
        const { phone } = req.body
        if (!phone) {
            return res.json({
                msg: 'Por favor, ingrese número telefónico'
            })
        }

        const user = await User.findById(id)
        user.phone = phone;
        await user.save();
        res.status(201).json({
            msg: 'Telefono actualizado'
        })
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

/*
// change password
const changePass = async (req,res) => {
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

        const link = `http://localhost:5000/api/user/reset-password/${emlUser._id}/${token}`;
        res.json({link});
        console.log(link);

    } catch (error) {}
}


const resetPass = async (req,res) => {
    const {id,token} = req.params;
    console.log (req.params);
    const emlUser = await User.findOne({ _id: id });
        if (!emlUser) {
            return res.json({status:"Usuario no existe"});
        }
        const secret = process.env.jwtSecret + emlUser.password;
        try {
            const verify = jwt.verify (token, secret);
            res.render("index",{email:verify.email});
        } catch (error){
            res.send ("No Verificado")
        }

}

*/


module.exports = { getProfile, updatePhone }