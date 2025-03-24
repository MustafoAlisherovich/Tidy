const adminCotroller = require('../controllers/admin.cotroller')

const router = require('express').Router()

router.get('/services', adminCotroller.getServices)
router.post('/create-service', adminCotroller.createService)
router.put('/update-product/:id', adminCotroller.updateService)
router.delete('/delete-product/:id', adminCotroller.deleteService)

module.exports = router
