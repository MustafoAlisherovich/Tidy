import LanguageDropdown from '@/components/shared/language-dropdown'
import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
	return (
		<div className='fixed inset-0 z-40 h-20 bg-background/70 backdrop:blur-xl'>
			<div className='container mx-auto flex h-full max-w-7xl items-center justify-between border-b'>
				<div className='flex items-center gap-4'>
					<Logo />
					<div className='flex items-center gap-3 border-l pl-2'>
						{navLinks.map(nav => (
							<Link
								href={`/${nav.route}`}
								key={nav.route}
								className='font-medium hover:underline hover:text-green-500 transition-all'
							>
								{nav.name}
							</Link>
						))}
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2 border-r pr-3'>
						<LanguageDropdown />
						<ModeToggle />
					</div>
					<Button size={'icon'} variant={'ghost'}>
						<Image
							src={'assets/social-media/instagram.svg'}
							alt='instagram'
							width={30}
							height={30}
						/>
					</Button>
					<Button size={'icon'} variant={'ghost'}>
						<Image
							src={'assets/social-media/telegram.svg'}
							alt='telegram'
							width={30}
							height={30}
						/>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
