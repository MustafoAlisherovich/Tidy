'use client'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import { IServices } from '@/types'
import { CircleHelp, Trash2 } from 'lucide-react'
import { FC } from 'react'
import NoSSR from 'react-no-ssr'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

interface Props {
	service: IServices[]
}

const WatchListTable: FC<Props> = ({ service }) => {
	return (
		<Table className='text-sm'>
			<TableCaption>Sizning oxirgi buyurtmalaringiz ro'yxati.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Xizmat</TableHead>
					<TableHead>Narx</TableHead>
					<TableHead>O'chirish</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{service.map(service => (
					<TableRow key={service._id}>
						<TableCell className='flex items-center gap-2'>
							{service.name}
							{service.description && (
								<HoverCard>
									<HoverCardTrigger asChild>
										<Button size='icon' variant='ghost'>
											<span>
												<CircleHelp size={16} />
											</span>
										</Button>
									</HoverCardTrigger>
									<HoverCardContent>{service.description}</HoverCardContent>
								</HoverCard>
							)}
						</TableCell>
						<TableCell>
							<NoSSR>{formatPrice(+service.price!)}</NoSSR>
						</TableCell>
						<TableCell>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button size='icon' variant='ghost'>
										<Trash2 className='text-red-500' />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Rostdan ham o'chirmoqchimisiz?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Ro'yxatdan o'chirish
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Ortga</AlertDialogCancel>
										<AlertDialogAction>Davom etish</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default WatchListTable
