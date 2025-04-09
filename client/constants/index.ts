import {
	Banknote,
	CheckCircle,
	DollarSign,
	Heart,
	Home,
	Phone,
	Settings2,
	Shield,
	Shuffle,
	Sparkles,
	ThumbsUp,
	User,
} from 'lucide-react'

export const navLinks = [
	{ route: '', name: 'Bosh sahifa', icon: Home },
	{ route: 'services', name: 'Xizmatlar', icon: Sparkles },
	{ route: 'price', name: 'Narxlar', icon: DollarSign },
	{ route: 'contacts', name: 'Aloqa', icon: Phone },
]

export const features = [
	{ icon: CheckCircle, title: 'strictSelection', text: 'strictTitle' },
	{ icon: ThumbsUp, title: 'qualityAssurance', text: 'qualityTitle' },
	{ icon: Heart, title: 'selectedCleaner', text: 'selectedTitle' },
	{ icon: Shield, title: 'Reliability', text: 'ReliabilityTitle' },
]

export const servicesHome = [
	{
		_id: 1,
		name: 'Pol yuvish',
		description: 'Faqat uydagi pollar yuviladi',
		price: 50000,
	},
	{ _id: 2, name: 'Gilam yuvish', price: 50000 },
	{ _id: 3, name: 'Mebel tozalash', price: 50000 },
	{ _id: 4, name: 'Chang artish', price: 50000 },
	{ _id: 5, name: 'Oyna artish', price: 50000 },
	{ _id: 6, name: "Narsalarni yig'ishtirish", price: 50000 },
	{ _id: 7, name: 'Axlatni olib chiqib ketish', price: 50000 },
	{ _id: 8, name: 'Jundan tozalash', price: 50000 },
	{ _id: 9, name: 'Changyutgich ishlatish', price: 50000 },
	{ _id: 10, name: 'Kiyimlarni taxlash', price: 50000 },
	{ _id: 11, name: 'Qandil yuvish', price: 50000 },
	{ _id: 12, name: 'Rakovina yuvish', price: 50000 },
	{ _id: 13, name: 'Idishlarni yuvish', price: 50000 },
	{ _id: 14, name: 'Gaz plitasini yuvish', price: 50000 },
	{ _id: 15, name: "Stol ustini yig'ishtirish", price: 50000 },
	{ _id: 16, name: 'Vanna va Dush xonasini yuvish', price: 50000 },
	{ _id: 17, name: 'Rakovina yuvish', price: 50000 },
	{ _id: 18, name: 'Tualet tozalash', price: 50000 },
	{ _id: 19, name: 'Hammon kafellarini tozalash', price: 50000 },
]

export const dashboardSidebar = [
	{ name: "Shaxsiy ma'lumot", route: '/dashboard', icon: User },
	{ name: 'Buyurtmalar', route: '/dashboard/orders', icon: Shuffle },
	{ name: "To'lovlar", route: '/dashboard/payments', icon: Banknote },
	{ name: "Ro'yxat", route: '/dashboard/watch-list', icon: Heart },
	{ name: 'Sozlamalar', route: '/dashboard/settings', icon: Settings2 },
]

export const adminSidebar = [
	{ name: 'Mijozlar', route: '/admin', icon: User },
	{ name: 'Xizmatlar', route: '/admin/services', icon: Shuffle },
	{ name: 'Buyurtmalar', route: '/admin/orders', icon: Heart },
	{ name: "To'lovlar", route: '/admin/payments', icon: Banknote },
]

export const faq = [
	{
		id: 1,
		title: 'Siz qanday xizmatlar ko‘rsatasiz?',
		description:
			'Biz vebsayt yaratish, texnik qo‘llab-quvvatlash va dizayn xizmatlarini taqdim etamiz.',
	},
	{
		id: 2,
		title: 'Buyurtmani qanday berishim mumkin?',
		description:
			'Telegram yoki vebsaytimiz orqali bog‘lanib, buyurtma berishingiz mumkin.',
	},
	{
		id: 3,
		title: 'To‘lov qanday amalga oshiriladi?',
		description: 'To‘lov Payme, Click yoki bank kartasi orqali qabul qilinadi.',
	},
	{
		id: 4,
		title: 'Xizmatlar narxi qancha?',
		description:
			'Narx xizmat turiga qarab o‘zgaradi. Batafsil ma’lumot uchun bog‘laning.',
	},
]
