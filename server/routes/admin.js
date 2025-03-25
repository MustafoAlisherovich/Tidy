const adminCotroller = require('../controllers/admin.cotroller')

const router = require('express').Router()

router.get('/services', adminCotroller.getServices)
router.get('/customers', adminCotroller.getCustomers)
router.get('/orders', adminCotroller.getOrders)
router.get('/transactions', adminCotroller.getTransactions)

router.post('/create-service', adminCotroller.createService)

router.put('/update-service/:id', adminCotroller.updateService)
router.put('/update-order/:id', adminCotroller.updateOrder)

router.delete('/delete-service/:id', adminCotroller.deleteService)

module.exports = router
