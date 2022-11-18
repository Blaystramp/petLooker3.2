const router = require('express').Router()

const auth = require('../middleware/auth')

const {getAdmin} = require('../controllers/adminController')

router.get('/api/admin/profile', getAdmin)



module.exports = router;