import { z } from 'zod'

export const contactSchema = z.object({
	message: z.string().min(10),
	email: z.string().email(),
	name: z.string().min(3),
})

export const orderSchema = z.object({
	name: z.string().min(2, 'Ism juda qisqa'),
	phone: z.string().min(6, 'Telefon raqam noto‘g‘ri'),
	address: z.string().min(5, 'Manzil juda qisqa'),
	services: z
		.array(z.object({ name: z.string(), price: z.number() }))
		.min(1, 'Kamida 1 ta xizmat tanlashingiz kerak'),
})

export const requestDialogSchema = z.object({
	name: z.string().min(3),
	phone: z.string().min(6),
	address: z.string().min(5),
	about: z.string().min(10),
})
