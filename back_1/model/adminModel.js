const mongoose = require('mongoose')

// Admin Schema
const adminSchema = new mongoose.Schema({
    provider: String,
    googleId: String,
    googleEmail: {
        type: String,
        trim: true
    },
    facebookId: String,
    facebookEmail: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    }
}, { timestamps: true })

adminSchema.index({ email: 1 })


module.exports = mongoose.model('Admin', adminSchema)