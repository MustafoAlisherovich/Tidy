'use client'

import { IUser } from '@/types'
import { LogIn } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface Props {
	user: IUser
}
const UserBox: FC<Props> = ({ user }) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='cursor-pointer'>
						<AvatarImage src={user.avatar} alt={user.fullName} />
						<AvatarFallback className='capitalize bg-primary text-white'>
							{user.fullName.charAt(0)}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>Hisob raqamim</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{user.role === 'admin' && (
						<DropdownMenuItem className='cursor-pointer' asChild>
							<Link href={'/admin'}>Admin</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className='cursor-pointer' asChild>
						<Link href={'/dashboard'}>Dashboard</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => setOpen(true)}
					>
						<LogIn />
						<span>Chiqish</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Ishonchingiz komilmi?</AlertDialogTitle>
						<AlertDialogDescription>
							Bu amalni ortga qaytarib bo‘lmaydi. Bu sizning hisobingizdan
							chiqadi.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Ortga</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => signOut({ callbackUrl: '/sign-in' })}
						>
							Davom etish
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default UserBox
