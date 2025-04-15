import { IFeature } from '@/types'
import request, { gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getFeatures = async () => {
	const query = gql`
		query MyQuery {
			features {
				id
				title
				text
				icon {
					url
				}
			}
		}
	`

	const { features } = await request<{ features: IFeature[] }>(
		graphqlAPI,
		query
	)
	return features
}
