const userModel = require('../models/user.model')
const serviceModel = require('../models/service.model')

class AdminController {
	constructor() {
		this.userId = '67e13b273de3c6efcbf02fb0'
		this.createService = this.createService.bind(this)
	}
	// GET admin Services
	async getServices(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const services = await serviceModel.find()
			return res.json({ success: 'Get services successfully', services })
		} catch (error) {
			next(error)
		}
	}
	// POST admin create-service
	async createService(req, res, next) {
		const data = req.body
		const userId = this.userId
		const user = await userModel.findById(userId)
		if (!user) return res.json({ failure: 'User not found' })
		if (user.role !== 'admin') return res.json({ failure: 'User is not admin' })
		const newService = await serviceModel.create({
			...data,
			price: parseInt(data.price),
		})
		if (!newService)
			return res.json({ failure: 'Failed while creating service' })
		return res.json({ success: 'Service created successfully' })
	}
	// PUT admin update-service
	async updateService(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const updateService = await serviceModel.findByIdAndUpdate(id, data)
			if (!updateService)
				return res.json({ failure: 'Failed while updating service' })
			return res.json({ success: 'Service updated successfully' })
		} catch (error) {
			next(error)
		}
	}
	// DELETE admin delete-service
	async deleteService(req, res, next) {
		try {
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const deletedService = await serviceModel.findByIdAndDelete(id)
			if (!deletedService)
				return res.json({ failure: 'Failed while deleting service' })
			return res.json({ success: 'Service deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()
