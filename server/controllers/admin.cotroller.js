const userModel = require('../models/user.model')
const serviceModel = require('../models/service.model')
const orderModel = require('../models/order.model')
const transactionModel = require('../models/transaction.model')

class AdminController {
	constructor() {
		this.userId = '67e13b273de3c6efcbf02fb0'
		this.createService = this.createService.bind(this)
		this.deleteService = this.deleteService.bind(this)
		this.getServices = this.getServices.bind(this)
		this.getCustomers = this.getCustomers.bind(this)
		this.getOrders = this.getOrders.bind(this)
		this.getTransactions = this.getTransactions.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
	}
	// GET admin Services
	async getServices(req, res, next) {
		try {
			const services = await serviceModel.find()
			return res.json({ services })
		} catch (error) {
			next(error)
		}
	}
	// GET admin customers
	async getCustomers(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const customers = await userModel.find({ role: 'user' })
			return res.json({ success: 'Get customers successfully', customers })
		} catch (error) {
			next(error)
		}
	}
	// GET admin orders
	async getOrders(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const orders = await orderModel.find()
			return res.json({ success: 'Get orders successfully', orders })
		} catch (error) {
			next(error)
		}
	}
	// GET admin transactions
	async getTransactions(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const transactions = await transactionModel.find()
			return res.json({
				success: 'Get transactions successfully',
				transactions,
			})
		} catch (error) {
			next(error)
		}
	}
	// POST admin create-service
	async createService(req, res, next) {
		try {
			const newService = await serviceModel.create(req.body)
			if (!newService) {
				return res.json({ failure: 'Failed while creating product' })
			}
			return res.json({ status: 201 })
		} catch (error) {
			console.log(error)
			next(error)
		}
	}
	// PUT admin update-orders
	async updateOrder(req, res, next) {
		try {
			const { status } = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const updateOrder = await orderModel.findByIdAndUpdate(id, { status })
			if (!updateOrder)
				return res.json({ failure: 'Failed while updating order' })

			return res.json({ success: 'Order updated Successfully' })
		} catch (error) {
			next(error)
		}
	}
	// DELETE admin delete-service
	async deleteService(req, res, next) {
		try {
			const { id } = req.params
			const deletedService = await serviceModel.findByIdAndDelete(id)
			if (!deletedService)
				return res.json({ failure: 'Failed while deleting service' })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()
