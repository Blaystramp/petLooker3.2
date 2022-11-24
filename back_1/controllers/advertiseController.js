const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const Advertise = require('../model/advertiseModel')
var mongoose = require('mongoose');

// post an advertise
const postAd = async (req, res) => {

    const { región, area, category, condicion, title, description, edad, isVacunas } = req.body

    if (!región || !area || !category || !condicion || !title || !description || !edad || !isVacunas) {
        return res.json({
            msg: "Por favor, complete todos los campos"
        })
    }

    // upload photos to cloudinary
    const uploader = async (path) => await cloudinary.uploads(path, 'images');

    try {
        const urls = []
        const files = req.files;
        if (!files) {
            return res.json({
                msg: "Por favor, ingrese imágenes"
            })
        }
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }

        const advertise = new Advertise({
            user: req.user.id,
            región: región,
            area: area,
            category: category,
            images: urls,
            condicion: condicion,
            title: title,
            description: description,
            edad: edad,
            isVacunas: isVacunas
        })
        await advertise.save();

        res.status(201).json({
            msg: 'Publicado exitosamente',
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// get all ads with pagination and filtering
const getAllAds = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { región, area, category, edad, searchKeyword } = req.body;

        let filterData = {};
        if (región) {
            filterData.región = new RegExp(región, "i")
        }
        if (area) {
            filterData.area = new RegExp(area, "i")
        }
        if (category) {
            filterData.category = new RegExp(category, "i")
        }
        if (edad) {
            filterData.edad = { $eq: edad }
        }

        if (searchKeyword) filterData.title = new RegExp(searchKeyword, "i");

        const ads = await Advertise.find(filterData).limit(limit * 1).skip((page - 1) * limit).populate({
            path: 'user',
            select: '-password -verificationCode'
        }).sort({ createdAt: -1 })
        const count = await Advertise.estimatedDocumentCount()

        res.status(200).json({
            ads,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// get single ad by id 
const getAdById = async (req, res) => {
    let { id } = req.params

    let isValid = mongoose.Types.ObjectId.isValid(id);

    try {
        if (!isValid) {
            return res.json({
                success: false,
                msg: "Invalid id"
            })
        }
        const result = await Advertise.findById(id).populate({
            path: 'user',
            select: '-password -verificationCode'
        })
        res.status(200).json(result)
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// get all ads by user id
const getAllAdsByUser = async (req, res) => {
    try {
        const { id } = req.user.id
        const result = await Advertise.find({ user: id })
        if (!result) {
            return res.json({ msg: 'Actualmente no tienes publicaciones' })
        }
        res.json(result)
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// show related ads depends on single ad title 
const relatedAds = async (req, res) => {

    try {
        let result;
        result = await Advertise.find({ title: new RegExp(req.body.title, "i") }).limit(10).populate({
            path: 'user',
            select: '-password -verificationCode'
        })
        if (!result) {
            result = await Advertise.find().limit(10)
        }
        res.json(result)
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// ads of user 2 
const adsOfUser = async (req, res) => {
    let { userid } = req.params

    //let isValid = mongoose.Types.ObjectId.isValid(id);
    //res.json(userid)
    try {
        /*
        if (!isValid) {
            return res.json({
                success: false,
                msg: "Invalid id"
            })
        }
        */
/////////////////
var query = { user: userid };

        const result = await Advertise.find(query)
        res.status(200).json(result)
////////////////
/*
        var query = { user: userid };

       const result2 = await Advertise.find(query).toArray(function(err, result2){
        res.status(200).json(result2)

       })
       if (user == Advertise.user){
        res.status(200).json(result)
       }
        //const result = await Advertise.find(user)
        res.status(200).json(result)
        */
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}

// delete ad by id
const deleteAdById = async (req, res) => {
    let { id } = req.params

    let isValid = mongoose.Types.ObjectId.isValid(id);

    try {
        if (!isValid) {
            return res.json({
                success: false,
                msg: "Invalid id"
            })
        }
        await Advertise.findByIdAndDelete(id)
        res.status(200).json({
            msg: "success"
        })
    } catch (err) {
        res.json({
            msg: "Algo salió mal"
        })
    }
}


module.exports = { postAd, getAllAds, getAdById, getAllAdsByUser, relatedAds, deleteAdById, adsOfUser }