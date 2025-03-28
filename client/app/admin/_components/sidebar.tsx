'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { adminSidebar } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()

	return (
		<div className='p-4 shadow-sm'>
			<h1 className='font-bold text-center text-2xl'>Admin</h1>
			<Separator className='mt-2' />
			<div className='flex flex-col mt-2'>
				{adminSidebar.map(item => (
					<Button
						key={item.route}
						asChild
						variant={pathname == item.route ? 'secondary' : 'ghost'}
						className={cn(
							'flex justify-start',
							pathname == item.route && 'font-bold'
						)}
					>
						<Link href={item.route}>
							<item.icon className='m-2 text-green-500' />
							<span>{item.name}</span>
						</Link>
					</Button>
				))}
			</div>
		</div>
	)
}

export default Sidebar
