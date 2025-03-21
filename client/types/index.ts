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
	_id: number | string
	name: string
	price: string | number
	description?: string
}
