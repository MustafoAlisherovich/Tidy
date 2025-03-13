'use client'

import { lngs } from '@/constants'
import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function LanguageDropdown() {
	const { lng } = useParams()
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Languages className={cn('text-white', isScrolled && 'text-black')} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-30'>
				<DropdownMenuGroup>
					{lngs.map(item => (
						<Link key={item.route} href={`/${item.route}`}>
							<DropdownMenuItem
								className={cn(
									'cursor-pointer',
									lng === item.route && 'bg-secondary'
								)}
							>
								<Image
									src={`/assets/locales/${item.route}.png`}
									alt={item.label}
									width={30}
									height={30}
								/>
								<span className='ml-2 font-space-grotesk font-medium'>
									{item.label}
								</span>
							</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageDropdown
