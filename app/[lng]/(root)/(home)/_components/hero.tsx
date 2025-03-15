'use client'

import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'

function Hero() {
	const t = useTranslate()

	return (
		<div className='relative w-full h-screen'>
			<Image
				src={'/assets/hero/house1.jpg'}
				alt='hero'
				fill
				className='object-cover'
			/>

			<div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 p-6'>
				<h1 className='text-4xl font-bold mb-4'>{t('heroTitle')}</h1>
				<p className='text-lg mb-6 max-w-lg'>{t('heroSpanTitle')}</p>
				<Button
					size={'lg'}
					className='px-6 py-3 rounded-lg text-lg font-medium transition'
				>
					{t('placingAnOrder')}
				</Button>
			</div>
		</div>
	)
}

export default Hero
