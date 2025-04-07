import { getOrders } from '@/actions/admin.action'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
import { format } from 'date-fns'
import OrderActions from '../_components/order-actions'

const Page = async () => {
	const res = await getOrders({})
	const orders = res?.data?.orders

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-2xl font-semibold'>Orders</h1>
			</div>

			<Separator className='my-3' />

			<Table>
				<TableCaption>Sizning oxirgi buyurtmalaringiz ro'yxati.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Service</TableHead>
						<TableHead>Mijozlar</TableHead>
						<TableHead>Narx</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Yaratilgan</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders &&
						orders.map(order => (
							<TableRow key={order._id}>
								<TableCell>{order.service.name}</TableCell>
								<TableCell>{order.user.email}</TableCell>
								<TableCell>
									<Badge variant='secondary'>{formatPrice(order.price)}</Badge>
								</TableCell>
								<TableCell>
									<Badge>{order.status}</Badge>
								</TableCell>
								<TableCell>
									{format(new Date(order.createdAt), 'dd MMM yyyy')}
								</TableCell>
								<TableCell className='text-right'>
									<OrderActions />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
