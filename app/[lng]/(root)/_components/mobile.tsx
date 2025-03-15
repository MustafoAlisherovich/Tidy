'use client'

import Logo from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { navLinks } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { AlignCenter } from 'lucide-react'
import Link from 'next/link'
import { VisuallyHidden } from 'react-aria'

function Mobile() {
	const t = useTranslate()

	return (
		<Sheet>
			<SheetTrigger asChild className='md:hidden'>
				<Button size={'icon'} variant={'ghost'}>
					<AlignCenter />
				</Button>
			</SheetTrigger>
			<SheetContent side={'top'}>
				<VisuallyHidden>
					<SheetTitle>helo</SheetTitle>
				</VisuallyHidden>
				<SheetHeader>
					<Logo />
					<Separator />
				</SheetHeader>
				<div className='mt-4 flex flex-col space-y-3'>
					{navLinks.map(nav => (
						<Link
							href={`/${nav.route}`}
							key={nav.route}
							className='flex h-12 coursor-pointer items-center gap-2 rounded-sm px-3 transition-colors hover:bg-green-400/20'
						>
							<nav.icon className='size-5' />
							<span>{t(nav.name)}</span>
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Mobile
