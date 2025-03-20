'use client'

import { Card } from '@/components/ui/card'
import { features } from '@/constants'

function FeaturesGuarantees() {
	return (
		<div className='py-12 px-4'>
			<div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{features.map((feature, index) => (
					<Card key={index} className='p-6 flex flex-col items-start'>
						<feature.icon size={32} className='text-green-500' />
						<h3 className='mt-4 text-xl font-semibold'>{feature.title}</h3>
						<p className='mt-2 text-gray-600'>{feature.text}</p>
					</Card>
				))}
			</div>
		</div>
	)
}

export default FeaturesGuarantees
