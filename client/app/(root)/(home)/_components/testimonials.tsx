'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ITestimonial } from '@/types'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
	testimonials: ITestimonial[]
}

function Testimonials({ testimonials }: Props) {
	const [expandedId, setExpandedId] = useState<string | null>(null)

	const handleExpand = (id: string) => {
		setExpandedId(prev => (prev === id ? null : id))
	}

	return (
		<section className='p-6 mx-auto max-w-6xl'>
			<h2 className='text-2xl font-bold mb-6 text-center'>
				{' '}
				Mijozlarimiz izohlari
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start'>
				{testimonials.map(item => (
					<Card key={item.id} className='shadow-lg max-w-sm flex flex-col'>
						<CardHeader className='flex items-center gap-4'>
							{item.image?.url ? (
								<Image
									src={item.image.url}
									alt={item.name}
									width={50}
									height={50}
									className='rounded-full'
								/>
							) : (
								<div className='w-[50px] h-[50px] flex items-center justify-center bg-gray-200 rounded-full'>
									<User size={24} className='text-gray-500' />
								</div>
							)}

							<div>
								<h3 className='font-bold'>{item.name}</h3>
								<p className='text-xs text-gray-500'>
									{format(new Date(item.createdAt), 'MMM dd yyyy')}
								</p>
							</div>
						</CardHeader>
						<CardContent className='flex-1 flex flex-col justify-between'>
							<p className='text-gray-700'>
								{expandedId === item.id
									? item.comment
									: `${item.comment.substring(0, 100)}...`}
							</p>

							<Button
								className='mt-2 flex items-center gap-1 text-sm text-green-500'
								variant={'ghost'}
								onClick={() => handleExpand(item.id)}
							>
								{expandedId === item.id ? 'Yopish' : 'Ochish'}
								{expandedId === item.id ? (
									<ChevronUp size={16} />
								) : (
									<ChevronDown size={16} />
								)}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}

export default Testimonials
