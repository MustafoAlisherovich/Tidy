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
			const userId = '67e13b273de3c6efcbf02fb0'
			const orders = await orderModel.find({ user: userId })
			return res.json(orders)
		} catch (error) {
			next(error)
		}
	}

	async getTransactions(req, res, next) {
		try {
			const userId = '67e13b273de3c6efcbf02fb0'
			const transactions = await transactionModel.find({ user: userId })
			return res.json(transactions)
		} catch (error) {
			next(error)
		}
	}

	async getFavorites(req, res, next) {
		try {
			const userId = '67e13b273de3c6efcbf02fb0'
			const user = await userModel.findById(userId).populate('favorites')
			return res.json(user.favorites)
		} catch (error) {
			next(error)
		}
	}

	async getStatistics(req, res, next) {
		try {
			const userId = '67e13b273de3c6efcbf02fb0'
			const user = await userModel.findById(userId)

			const totalOrders = await orderModel.countDocuments({ user: user._id })
			const totalTransactions = await transactionModel.countDocuments({
				user: user._id,
			})
			const totalFavourites = user.favorites.length

			return res.json({ totalOrders, totalTransactions, totalFavourites })
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
			return res.json(user)
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
			const userId = '67e13b273de3c6efcbf02fb0'
			const user = await userModel.findById(userId)

			const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isPasswordMatch)
				return res.json({ failure: 'Old password is incorrect' })

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })
			res.json({ success: 'Password updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	async deleteFavorite(req, res, next) {
		try {
			const { id } = req.params
			const userId = '67e13b273de3c6efcbf02fb0'
			const user = await userModel.findById(userId)
			user.favorites.pull(id)
			await user.save()
			return res.json({ success: 'Service removed from favorites' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
