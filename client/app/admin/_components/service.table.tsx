'use client'

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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useService } from '@/hooks/use-service'
import { formatPrice } from '@/lib/utils'
import { IServices } from '@/types'
import { CircleHelp, Edit, Trash2 } from 'lucide-react'
import { FC } from 'react'
import NoSSR from 'react-no-ssr'

interface Props {
	service: IServices[]
}

const ServiceTable: FC<Props> = ({ service }) => {
	const { setOpen } = useService()

	const onEdit = () => {
		setOpen(true)
	}
	return (
		<Table>
			<TableCaption>Xizmat qo'shish</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Xizmat</TableHead>
					<TableHead>Narx</TableHead>
					<TableHead>O'zgartirish</TableHead>
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
							<Button variant='ghost' onClick={onEdit}>
								<Edit />
							</Button>
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
											Xizmatni o'chirish
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

export default ServiceTable
