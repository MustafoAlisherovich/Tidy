'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import { IServices } from '@/types'
import { FC } from 'react'

interface Props {
	service: IServices
}

const WatchListCard: FC<Props> = ({ service }) => {
	return (
		<TableRow>
			<TableCell>{service.name}</TableCell>
			<TableCell className='text-right'>
				{formatPrice(+service.price!)}
			</TableCell>
		</TableRow>
	)
}

export default WatchListCard
