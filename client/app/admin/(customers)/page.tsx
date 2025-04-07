import { getCustomers } from '@/actions/admin.action'
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

const Page = async () => {
	const res = await getCustomers({})
	const customers = res?.data?.customers
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-2xl font-semibold'>Mijozlar</h1>
			</div>

			<Separator className='my-3' />

			<Table>
				<TableCaption>Sizning so'nggi mijozlaringiz ro'yxati.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>№</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>To'liq ism</TableHead>
						<TableHead>Buyurtmalar</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>To'lovlar</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers && customers.length === 0 && (
						<TableRow>
							<TableCell className='text-center' colSpan={6}>
								Mijozlar topilmadi
							</TableCell>
						</TableRow>
					)}
					{customers &&
						customers.map((customer, index) => (
							<TableRow key={customer._id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{customer.email}</TableCell>
								<TableCell>{customer.fullName}</TableCell>
								<TableCell>
									<Badge>{customer.orderCount}</Badge>
								</TableCell>
								<TableCell>
									<Badge
										variant={customer.isDeleted ? 'destructive' : 'secondary'}
									>
										{customer.isDeleted ? 'Deleted' : 'Faol'}
									</Badge>
								</TableCell>
								<TableCell className='text-right'>
									<Badge variant={'outline'}>
										{formatPrice(customer.totalPrice)}
									</Badge>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
