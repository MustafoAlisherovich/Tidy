'use client'

import { deleteService } from '@/actions/admin.action'
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
import UseAction from '@/hooks/use-action'
import { useService } from '@/hooks/use-service'
import { formatPrice } from '@/lib/utils'
import { IService } from '@/types'
import { CircleHelp, Trash2 } from 'lucide-react'
import { FC } from 'react'
import NoSSR from 'react-no-ssr'
import { toast } from 'sonner'

interface Props {
	service: IService[]
}

const ServiceTable: FC<Props> = ({ service }) => {
	const { setOpen, setService } = useService()
	const { isLoading, onError, setIsLoading } = UseAction()

	const onEdit = () => {
		setOpen(true)
		setService(service)
	}

	async function onDelete(id: string) {
		setIsLoading(true)

		const res = await deleteService({ id })

		if (res?.serverError || res?.validationErrors || !res?.data) {
			setIsLoading(false)
			return onError('Nimadir xato ketdi!')
		}

		if (res.data.failure) {
			setIsLoading(false)
			return onError(res.data.failure)
		}

		if (res.data.status === 200) {
			useService.setState(prev => ({
				service: prev.service?.filter(s => s._id !== id) || [],
			}))

			toast.success('Xizmat muvaffaqiyatli o‘chirildi')
			setIsLoading(false)
		}
	}

	return (
		<Table>
			<TableCaption>Xizmatlar</TableCaption>
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
											Xizmatni o'chirish
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel disabled={isLoading}>
											Ortga
										</AlertDialogCancel>
										<AlertDialogAction
											disabled={isLoading}
											onClick={() => onDelete(service._id)}
										>
											Davom etish
										</AlertDialogAction>
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
