const router = require('express').Router()

const auth = require('../middleware/auth')


const {getProfile, updatePhone, changePass, resetPass} = require('../controllers/profileController')

// route get /api/user/profile
// desc get user profile
// access // private

router.get('/api/user/profile',auth, getProfile)

// route get /api/user/profile/updatePhone
// desc update user phone
// access // private

router.put('/api/user/profile/updatePhone',auth, updatePhone)

//router.post('/api/user/forgot-password',changePass)

//router.get("/api/user/reset-password/:id/:token",resetPass)



module.exports = router;