import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'us-west-2.graphassets.com',
			},
		],
	},
}

export default nextConfig
