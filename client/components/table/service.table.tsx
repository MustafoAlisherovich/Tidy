'use client'

import { addFavorite } from '@/actions/user.action'
import UseAction from '@/hooks/use-action'
import { IService } from '@/types'
import { CircleHelp, Plus } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'

interface Props {
	service: IService
}

const ServiceTable: FC<Props> = ({ service }) => {
	const { onError, isLoading, setIsLoading } = UseAction()
	const [isFavorite, setIsFavorite] = useState(false)

	const onFavorite = async () => {
		setIsLoading(true)
		try {
			const res = await addFavorite({ id: service._id })

			if (res?.serverError || res?.validationErrors || !res?.data) {
				return onError('Something went wrong')
			}
			if (res.data.failure) {
				return onError(res.data.failure)
			}
			if (res.data.status === 200) {
				toast.success('Added to favorites')
			}
		} catch (error) {
			onError('Server bilan aloqa uzildi')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Table className='min-w-full text-left border'>
			<TableHeader>
				<TableRow>
					<TableHead className='p-2'>Xizmat nomi</TableHead>
					<TableHead className='p-2'>Narx</TableHead>
					<TableHead className='p-2'>Tavsif</TableHead>
					<TableHead className='p-2'>Qo'shish</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow key={service._id} className='border-t'>
					<TableCell className='p-2'>{service.name}</TableCell>
					<TableCell className='p-2'>
						{service.price.toLocaleString()} so'm
					</TableCell>

					<TableCell className='p-2'>
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
					<TableCell className='p-2'>
						<Button
							variant='outline'
							size='icon'
							onClick={onFavorite}
							disabled={isLoading}
						>
							<Plus />
						</Button>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default ServiceTable
