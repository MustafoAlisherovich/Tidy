import { getOrders } from '@/actions/user.action'
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

const Page = async () => {
	const res = await getOrders({})
	const orders = res?.data?.orders

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-2xl font-semibold'>Buyurtmalar</h1>
			</div>

			<Separator className='my-3' />

			<div className='w-full overflow-x-auto'>
				<Table className='min-w-[600px] text-sm'>
					{orders && orders.length > 0 && (
						<TableCaption>Sizning oxirgi buyurtmangiz ro'yxati.</TableCaption>
					)}
					<TableHeader>
						<TableRow>
							<TableHead>Xizmat</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Narx</TableHead>
							<TableHead>Buyurtma vaqti</TableHead>
							<TableHead className='text-right'>Yangilangan vaqti</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders && orders.length === 0 && (
							<TableRow>
								<TableCell className='text-center' colSpan={5}>
									Buyurtmalar topilmadi
								</TableCell>
							</TableRow>
						)}
						{orders &&
							orders.map(order => (
								<TableRow key={order._id}>
									<TableCell>{order.service.name}</TableCell>
									<TableCell>
										<Badge>{order.status}</Badge>
									</TableCell>
									<TableCell>{formatPrice(order.price)}</TableCell>
									<TableCell>
										{format(new Date(order.createdAt), 'dd-MMM yyyy')}
									</TableCell>
									<TableCell className='text-right'>
										{format(new Date(order.createdAt), 'dd-MMM hh:mm a')}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</>
	)
}

export default Page
