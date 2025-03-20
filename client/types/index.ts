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
