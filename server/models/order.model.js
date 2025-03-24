const { Schema, model } = require('mongoose')

const orderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
		price: { type: Number, required: true },
		status: { type: String, default: 'Pending confirm' },
	},
	{ timestamps: true }
)

module.exports = model('Order', orderSchema)
