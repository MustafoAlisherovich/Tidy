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
import OrderActions from '../_components/order-actions'

const Page = () => {
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
					<TableRow>
						<TableCell>Service 1</TableCell>
						<TableCell>info@mustafoalisherovich.uz</TableCell>
						<TableCell>100$</TableCell>
						<TableCell>Kutilmoqda</TableCell>
						<TableCell>11/11/2025</TableCell>
						<TableCell className='text-right'>
							<OrderActions />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

export default Page
