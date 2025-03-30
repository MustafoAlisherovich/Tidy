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

export interface IServices {
	_id: string
	name: string
	price: string
	description?: string
}

export interface ReturnActionType {
	user: IUser
	failure: string
	status: number
	services: IServices[]
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
	favorites: IServices[]
}
