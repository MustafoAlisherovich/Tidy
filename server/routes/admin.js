const adminCotroller = require('../controllers/admin.cotroller')
const adminMiddleware = require('../middlewares/admin.middleware')

const router = require('express').Router()

router.get('/services', adminCotroller.getServices)
router.get('/customers', adminCotroller.getCustomers)
router.get('/orders', adminCotroller.getOrders)
router.get('/transactions', adminCotroller.getTransactions)

router.post('/create-service', adminMiddleware, adminCotroller.createService)

router.put('/update-order/:id', adminCotroller.updateOrder)

router.delete('/delete-service/:id', adminCotroller.deleteService)

module.exports = router
