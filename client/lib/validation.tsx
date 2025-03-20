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
})

export const apartmentSchema = z.object({
	washingFloor: z.boolean(),
	washingCarpet: z.boolean(),
	washingFurniture: z.boolean(),
	cleaningDust: z.boolean(),
	washingGlasses: z.boolean(),
	putThings: z.boolean(),
	garbage: z.boolean(),
	washingSink: z.boolean(),
	washingTable: z.boolean(),
	washingPlate: z.boolean(),
	washingDishes: z.boolean(),
	washingBathAndShower: z.boolean(),
	washingToilet: z.boolean(),
})

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

export const registerSchema = z.object({
	fullName: z.string().min(3, {
		message: "To'liq ismingiz kamida 3 ta belgidan iborat bo'lishi kerak",
	}),
	email: z.string().email({ message: "Email noto'g'ri" }),
	password: z
		.string()
		.min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }),
})
