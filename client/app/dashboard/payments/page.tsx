import { getTransactions } from '@/actions/user.action'
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
	const res = await getTransactions({})
	const transactions = res?.data?.transactions

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-2xl font-semibold'>To'lovlar</h1>
			</div>

			<Separator className='my-3' />

			<div className='w-full overflow-x-auto'>
				<Table className='min-w-[500px] text-sm'>
					{transactions && transactions.length > 0 && (
						<TableCaption>Sizning oxirgi to'lovlaringiz ro'yxati.</TableCaption>
					)}
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Provider</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className='text-right'>Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions && transactions.length === 0 && (
							<TableRow>
								<TableCell className='text-center' colSpan={4}>
									To'lovlar topilmadi
								</TableCell>
							</TableRow>
						)}
						{transactions &&
							transactions.map(transaction => (
								<TableRow key={transaction._id}>
									<TableCell>{transaction.service.name}</TableCell>
									<TableCell>{transaction.provider}</TableCell>
									<TableCell>{transaction.state}</TableCell>
									<TableCell className='text-right'>
										{formatPrice(transaction.amount)}
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
