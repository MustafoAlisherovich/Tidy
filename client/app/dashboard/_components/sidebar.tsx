'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { dashboardSidebar } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()
	return (
		<div className='p-4 shadow-sm w-full'>
			<h1 className='font-bold text-xl md:text-2xl text-center md:text-left'>
				Dashboard
			</h1>
			<Separator className='mt-2' />

			<div className='flex flex-col mt-4 space-y-1'>
				{dashboardSidebar.map(item => (
					<Button
						key={item.route}
						asChild
						variant='ghost'
						className={cn(
							'flex items-center justify-start gap-2 w-full px-3 py-2 text-sm md:text-base',
							pathname === item.route && 'font-bold'
						)}
					>
						<Link href={item.route} className='flex items-center gap-2 w-full'>
							<item.icon className='text-green-500' size={18} />
							<span className='truncate'>{item.name}</span>
						</Link>
					</Button>
				))}
			</div>
		</div>
	)
}

export default Sidebar
