const orderModel = require('../models/order.model')
const serviceModel = require('../models/service.model')
const transactionModel = require('../models/transaction.model')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class UserController {
	// GET user/services
	async getServices(req, res, next) {
		try {
			const services = await serviceModel.find()
			return res.json({ services })
		} catch (error) {
			next(error)
		}
	}
	// GET user/profile/:id
	async getProfile(req, res, next) {
		try {
			const user = await userModel.findById(req.params.id).select('-password')
			return res.json({ user })
		} catch (error) {
			next(error)
		}
	}

	async getOrders(req, res, next) {
		try {
			const userId = req.user._id
			const orders = await orderModel.aggregate([
				{ $match: { user: userId } },
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
						'service.name': 1,
						'service.price': 1,
						createdAt: 1,
						updatedAt: 1,
						price: 1,
						status: 1,
					},
				},
			])

			return res.json({ orders })
		} catch (error) {
			next(error)
		}
	}

	async getTransactions(req, res, next) {
		try {
			const userId = req.user._id
			const transactions = await transactionModel.aggregate([
				{ $match: { user: userId } },
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
						'service.name': 1,
						amount: 1,
						state: 1,
						create_time: 1,
						perform_time: 1,
						reason: 1,
						provider: 1,
					},
				},
			])
			return res.json({ transactions })
		} catch (error) {
			next(error)
		}
	}

	async getFavorites(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)
			const matchQuery = { _id: { $in: user.favorites } }
			const services = await serviceModel.find(matchQuery)
			return res.json({ services })
		} catch (error) {
			next(error)
		}
	}

	async getStatistics(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'Foydalanuvchi topilmadi' })
			const totalOrders = await orderModel.countDocuments({ user: user._id })
			const totalTransactions = await transactionModel.countDocuments({
				user: user._id,
			})
			const totalFavourites = user.favorites.length
			const statistics = { totalOrders, totalTransactions, totalFavourites }
			return res.json({ statistics })
		} catch (error) {
			next(error)
		}
	}

	async addFavorite(req, res, next) {
		try {
			const { productId } = req.body
			const userId = req.user._id
			const isExist = await userModel.findOne({
				_id: userId,
				favorites: productId,
			})
			if (isExist)
				return res.json({ failure: "Xizmat allaqachon qo'shib bo'lingan" })
			const user = await userModel.findById(userId)
			user.favorites.push(productId)
			await user.save()
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	async updateProfile(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			await userModel.findByIdAndUpdate(userId, req.body)
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	async updatePassword(req, res, next) {
		try {
			const { oldPassword, newPassword } = req.body
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return { failure: 'Foydalanuvchi topilmadi' }
			const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isPasswordMatch) return res.json({ failure: "Eski parol noto'g'ri" })

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	async deleteFavorite(req, res, next) {
		try {
			const { id } = req.params
			const userId = req.user._id
			const user = await userModel.findById(userId)
			user.favorites.pull(id)
			await user.save()
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
