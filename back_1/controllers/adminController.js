const Admin = require('../model/adminModel')
const jwt = require('jsonwebtoken')
const { application } = require('express')
require('dotenv').config()






// get user profile
const getAdmin = async (req, res) => {
    try {
        const { id } = req.user
        const user = await Admin.findById(id).select('-password').select('-verificationCode')
        res.json(user)
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

module.exports = { getAdmin }