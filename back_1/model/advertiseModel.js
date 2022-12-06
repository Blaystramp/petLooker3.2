const mongoose = require('mongoose')

// advertise schema
const advertiseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    región: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    images: {
        type: [],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condicion: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    isVacunas: {
        type: Boolean,
        default: false
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// Indexing

advertiseSchema.index({ región: 1, area: 1, category: 1, title: 1, edad: 1 });

module.exports = mongoose.model('Advertise', advertiseSchema)