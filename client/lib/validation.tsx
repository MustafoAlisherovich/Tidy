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

export const verifyOtpSchema = z.object({
	otp: z
		.string()
		.length(6, { message: "OTP kamida 6ta belgidan iborat bo'lishi kerak" }),
	email: z.string().email({ message: "Email noto'g'ri" }),
})

export const otpSchema = z.object({
	otp: z
		.string()
		.length(6, { message: "OTP kamida 6ta belgidan bo'lishi kerak" }),
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

export const fullNameSchema = z.object({
	fullName: z.string().min(3, {
		message: "To'liq ism kamida 3 ta belgidan iborat bo'lishi kerak",
	}),
})

export const emailSchema = z.object({
	email: z.string().email({ message: "Email noto'g'ri" }),
})

export const passwordSchema = z
	.object({
		oldPassword: z
			.string()
			.min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }),
		newPassword: z
			.string()
			.min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }),
		confirmPassword: z
			.string()
			.min(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" }),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Parollar mos kelmaydi',
		path: ['confirmPassword'],
	})

export const addServiceSchema = z.object({
	name: z.string().min(3, {
		message: "Xizmat nomi kamida 3ta belgidan iborat bo'lishi kerak",
	}),
	price: z.string(),
	description: z.string().min(10).optional(),
})

export const idSchema = z.object({
	id: z.string(),
})

export const updateUserSchema = z.object({
	fullName: z.string().optional(),
	email: z.string().optional(),
	avatar: z.string().optional(),
	avatarKey: z.string().optional(),
	isDeleted: z.boolean().optional(),
	deletedAt: z.string().optional(),
})
