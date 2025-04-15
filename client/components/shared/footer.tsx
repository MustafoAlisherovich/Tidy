'use client'

import Logo from '@/components/shared/logo'
import { Separator } from '@/components/ui/separator'
import { navLinks } from '@/constants'

import { Mail, MapPin, PhoneCall } from 'lucide-react'
import Link from 'next/link'

function Footer() {
	return (
		<div className='mt-12 bg-secondary pt-12 max-md:px-4'>
			<div className='container mx-auto max-w-7xl pb-12'>
				<div className='grid grid-cols-1 gap-12 md:grid-cols-4'>
					<div className='flex flex-col space-y-3 md:col-span-2'>
						<Logo />
						<p>
							Bizning professional tozalash xizmatlarimiz bilan uyingizni toza
							va sog'lom saqlang.
						</p>
					</div>

					<div className='flex flex-col space-y-3'>
						<h1 className='font-semibold font-poppins text-3xl'>Sahifalar</h1>
						<div className='flex flex-col space-y-3 pt-6'>
							{navLinks.map(nav => (
								<Link
									href={`/${nav.route}`}
									key={nav.route}
									className='font-medium transition-all hover:text-green-500 hover:underline'
								>
									{nav.name}
								</Link>
							))}
						</div>
					</div>

					<div className='flex flex-col space-y-3'>
						<h1 className='font-semibold text-3xl font-poppins'>Aloqa</h1>
						<div className='flex flex-col space-y-3 pt-6'>
							<div className='flex items-center space-x-3'>
								<PhoneCall size={20} />
								<div className='flex flex-col space-y-1'>
									<a
										className='text-sm hover:text-green-500 hover:underline'
										href='tel:+998905707370'
									>
										+998 (90) 570-73-70
									</a>
									<Separator className='bg-gray-500' />
									<a
										href='tel:+998911554995'
										className='text-sm hover:text-green-500 hover:underline'
									>
										+998 (90) 155-49-95
									</a>
								</div>
							</div>

							<div className='flex items-center space-x-3'>
								<Mail size={20} />
								<a
									className='text-sm hover:text-green-500 hover:underline'
									href='mailto:mustafoalisherovic@gmail.com'
								>
									mustafoalisherovic@gmail.com
								</a>
							</div>
							<div className='flex items-center space-x-3'>
								<MapPin size={20} />
								<span className='text-sm'>Kokand Farobiy-9 14</span>
							</div>
						</div>
					</div>
				</div>
				<div className='pt-12'>
					<Separator className='bg-gray-500' />
					<p>© {new Date().getFullYear()}. Barcha huquqlar himoyalangan</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
