import { lngs } from '@/constants'
import { Languages } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function LanguageDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size={'icon'}>
					<Languages />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuGroup>
					{lngs.map(item => (
						<DropdownMenuItem key={item.route} className='cursor-pointer'>
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
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageDropdown
