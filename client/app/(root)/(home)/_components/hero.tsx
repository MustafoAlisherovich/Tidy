'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
	return (
		<div className='relative w-full h-[80vh] max-md:h-[60vh] max-md:pt-32'>
			<Image
				src={'/assets/hero/house1.jpg'}
				alt='hero'
				fill
				className='object-cover'
			/>

			<div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 p-6'>
				<h1 className='text-4xl font-bold mb-4 max-md:text-3xl font-poppins'>
					Uyingiz har doim toza!
				</h1>
				<p className='text-lg mb-6 max-w-lg max-md:text-base'>
					Bizning professional tozalash xizmatlarimiz bilan uyingizni toza va
					sog'lom saqlang.
				</p>
				<Link href={'/services'}>
					<Button
						size={'lg'}
						className='px-6 py-3 rounded-lg text-lg font-medium transition max-md:px-4 max-md:py-2 max-md:text-base cursor-pointer'
					>
						Bizning xizmatlar
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default Hero
