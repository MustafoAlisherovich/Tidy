const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class AuthController {
	async login(req, res, next) {
		try {
			const { email, password } = req.body

			const user = await userModel.findOne({ email })
			if (!user) return res.json({ failure: 'Foydalanuvchi topilmadi' })
			const isValidPassword = await bcrypt.compare(password, user.password)
			if (!isValidPassword) return res.json({ failure: "Parol noto'g'ri" })
			if (user.isDeleted)
				return res.json({
					failure: `Foydalanuvchi ${user.deletedAt.toLocaleString()} o'chirilgan`,
				})

			return res.json({ user })
		} catch (error) {
			next(error)
		}
	}
	async register(req, res, next) {
		try {
			const { email, password, fullName } = req.body

			const user = await userModel.findOne({ email })
			if (user) return res.json({ failure: 'Foydalanuvchi allaqachon mavjud' })

			const hashedPassword = await bcrypt.hash(password, 10)
			const newUser = await userModel.create({
				email,
				password: hashedPassword,
				fullName,
			})

			return res.json({ user: newUser })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AuthController()
