'use client'

import Logo from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Mobile from '../../app/(root)/_components/mobile'

function Navbar() {
	return (
		<div className='inset-0 h-20  transition-all'>
			<div className='container mx-auto flex h-full max-w-7xl items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Logo />
					<div className='hidden items-center gap-3 border-l pl-2 md:flex'>
						{navLinks.map(nav => (
							<Link
								href={`/${nav.route}`}
								key={nav.route}
								className={cn(
									'font-medium hover:underline hover:text-green-500 transition-all'
								)}
							>
								{nav.name}
							</Link>
						))}
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2 md:border-r md:pr-3'>
						<Mobile />
					</div>
					<div className='hidden md:flex'>
						<Link href={'https://instagram.com'}>
							<Button size={'icon'} variant={'ghost'}>
								<Image
									src={'/assets/social-media/instagram.svg'}
									alt='instagram'
									width={30}
									height={30}
								/>
							</Button>
						</Link>
						<Link href={'https://telegram.org'}>
							<Button size={'icon'} variant={'ghost'}>
								<Image
									src={'/assets/social-media/telegram.svg'}
									alt='telegram'
									width={30}
									height={30}
								/>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
