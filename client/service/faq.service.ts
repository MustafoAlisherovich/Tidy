import request, { gql } from 'graphql-request'
import { IFaq } from './../types/index'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getFaqs = async () => {
	const query = gql`
		query MyQuery {
			faqs {
				id
				title
				description
			}
		}
	`

	const { faqs } = await request<{ faqs: IFaq[] }>(graphqlAPI, query)
	return faqs
}
