import { ReactNode } from 'react'

export interface ChildProps {
	children: ReactNode
}

export interface ITestimonial {
	id: string
	name: string
	comment: string
	createdAt: string
	image: { url: string }
}

export interface IService {
	_id: string
	name: string
	price: string
	description?: string
}

export interface ReturnActionType {
	user: IUser
	failure: string
	status: number
	services: IService[]
	customers: IUser[]
	orders: IOrder[]
	transactions: ITransactions[]
	statistics: {
		totalOrders: number
		totalTransactions: number
		totalFavourites: number
	}
}

export interface IUser {
	email: string
	fullName: string
	password: string
	_id: string
	role: string
	orderCount: number
	totalPrice: number
	avatar: string
	avatarKey: string
	isDeleted: boolean
	deletedAt: Date
	favorites: IService[]
}

export interface IOrder {
	_id: string
	user: IUser
	service: IService
	createdAt: Date
	price: number
	status: string
	updatedAt: Date
}

export interface ITransactions {
	_id: string
	id: string
	user: IUser
	service: IService
	state: number
	amount: number
	create_time: number
	perform_time: number
	cancel_time: number
	reason: number
	provider: string
}
