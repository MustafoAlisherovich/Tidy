'use client'

import { deleteFavourite } from '@/actions/user.action'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import UseAction from '@/hooks/use-action'
import { formatPrice } from '@/lib/utils'
import { IService } from '@/types'
import { CircleHelp, Trash2 } from 'lucide-react'
import { FC } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

interface Props {
	service: IService
}

const WatchListTable: FC<Props> = ({ service }) => {
	const { isLoading, onError, setIsLoading } = UseAction()

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteFavourite({ id: service._id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError("Nimadir noto'g'ri ketdi!")
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success("Muvaffaqiyatli o'chirildi")
			setIsLoading(false)
		}
	}

	return (
		<Table className='min-w-full text-left border mt-4'>
			<TableHeader>
				<TableRow>
					<TableHead className='p-2'>Xizmat nomi</TableHead>
					<TableHead className='p-2'>Narx</TableHead>
					<TableHead className='p-2'>Tavsif</TableHead>
					<TableHead className='p-2'>O'chirish</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow key={service._id} className='border-t'>
					<TableCell className='p-2'>{service.name}</TableCell>
					<TableCell className='p-2'>{formatPrice(service.price)}</TableCell>

					<TableCell className='p-2'>
						{service.description && (
							<HoverCard>
								<HoverCardTrigger asChild>
									<Button
										size='icon'
										variant='ghost'
										className='cursor-pointer'
									>
										<span>
											<CircleHelp size={16} />
										</span>
									</Button>
								</HoverCardTrigger>
								<HoverCardContent>{service.description}</HoverCardContent>
							</HoverCard>
						)}
					</TableCell>
					<TableCell className='p-2'>
						<Button
							variant='outline'
							size='icon'
							disabled={isLoading}
							className='cursor-pointer'
							onClick={onDelete}
						>
							<Trash2 className='text-red-500' />
						</Button>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default WatchListTable
