const { Schema, model } = require('mongoose')

const serviceSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		stripePriceId: { type: String },
		stripeServiceId: { type: String },
	},
	{ timestamps: true }
)

module.exports = model('Service', serviceSchema)
