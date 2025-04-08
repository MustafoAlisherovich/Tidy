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
			const customers = await userModel.aggregate([
				{ $match: { role: 'user' } },
				{
					$lookup: {
						from: 'orders',
						localField: '_id',
						foreignField: 'user',
						as: 'orders',
					},
				},
				{ $addFields: { orderCount: { $size: '$orders' } } },
				{ $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
				{
					$group: {
						_id: '$_id',
						email: { $first: '$email' },
						fullName: { $first: '$fullName' },
						role: { $first: '$role' },
						createdAt: { $first: '$createdAt' },
						updatedAt: { $first: '$updatedAt' },
						totalPrice: { $sum: '$order.price' },
						totalSquareMeters: { $sum: '$orders.services.squareMeters' },
						orderCount: { $first: '$orderCount' },
						isDeleted: { $first: '$isDeleted' },
					},
				},
			])
			return res.json({ customers })
		} catch (error) {
			next(error)
		}
	}
	// GET admin orders
	async getOrders(req, res, next) {
		try {
			const orders = await orderModel.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',
					},
				},
				{ $unwind: '$user' },

				{
					$lookup: {
						from: 'services',
						localField: 'service',
						foreignField: '_id',
						as: 'service',
					},
				},
				{ $unwind: '$service' },

				{
					$project: {
						'user.email': 1,
						'user.fullName': 1,
						'service.name': 1,
						price: 1,
						createdAt: 1,
						status: 1,
					},
				},
			])

			return res.json({ success: true, orders })
		} catch (error) {
			next(error)
		}
	}

	// GET admin transactions
	async getTransactions(req, res, next) {
		try {
			const transactions = await transactionModel.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',
					},
				},
				{ $unwind: '$user' },

				{
					$lookup: {
						from: 'services',
						localField: 'service',
						foreignField: '_id',
						as: 'service',
					},
				},
				{ $unwind: '$service' },

				{
					$project: {
						'user.email': 1,
						'user.fullName': 1,
						'service.name': 1,
						'service.price': 1,
						amount: 1,
						createdAt: 1,
						state: 1,
						provider: 1,
					},
				},
			])
			return res.json({ transactions })
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
