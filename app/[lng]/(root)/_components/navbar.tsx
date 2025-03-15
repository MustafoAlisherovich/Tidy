'use client'

import LanguageDropdown from '@/components/shared/language-dropdown'
import Logo from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
	const t = useTranslate()

	return (
		<div
			className={cn(
				'fixed inset-0 z-40 h-20 bg-background/70 backdrop:b transition-all'
			)}
		>
			<div className='container mx-auto flex h-full max-w-7xl items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Logo />
					<div className='flex items-center gap-3 border-l pl-2'>
						{navLinks.map(nav => (
							<Link
								href={`/${nav.route}`}
								key={nav.route}
								className={cn(
									'font-medium hover:underline hover:text-green-500 transition-all'
								)}
							>
								{t(nav.name)}
							</Link>
						))}
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2 border-r pr-3'>
						<LanguageDropdown />
					</div>
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
	)
}

export default Navbar
