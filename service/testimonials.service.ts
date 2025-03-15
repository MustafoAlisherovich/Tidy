import { ITestimonial } from '@/types'
import request, { gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getTestimonials = async () => {
	const query = gql`
		query MyQuery {
			testimonials {
				id
				comment
				name
				createdAt
				image {
					url
				}
			}
		}
	`

	const { testimonials } = await request<{ testimonials: ITestimonial[] }>(
		graphqlAPI,
		query
	)
	return testimonials
}
