import { getTransactions } from '@/actions/admin.action'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
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
				<h1 className='text-2xl font-semibold'>To'lov</h1>
			</div>

			<Separator className='my-3' />

			<Table>
				<TableCaption>Sizning oxirgi to'lovlaringiz ro'yxati.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Xizmat</TableHead>
						<TableHead>Mijoz</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Provider</TableHead>
						<TableHead className='text-right'>Narx</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions && transactions.length === 0 && (
						<TableRow>
							<TableCell className='text-center' colSpan={5}>
								To'lovlaringiz topilmadi
							</TableCell>
						</TableRow>
					)}
					{transactions &&
						transactions.map(transaction => (
							<TableRow key={transaction._id}>
								<TableCell>{transaction.service.name}</TableCell>
								<TableCell>{transaction.user.email}</TableCell>
								<TableCell>{transaction.state}</TableCell>
								<TableCell>{transaction.provider}</TableCell>
								<TableCell className='text-right'>
									<Badge variant='secondary'>
										{formatPrice(transaction.amount)}
									</Badge>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
				{transactions && transactions.length > 0 && (
					<TableFooter>
						<TableRow>
							<TableCell colSpan={4} className='font-bold'>
								Umumiy
							</TableCell>
							<TableCell className='text-right'>
								<Badge>
									{formatPrice(
										transactions.reduce((acc, transaction) => {
											return acc + transaction.amount
										}, 0)
									)}
								</Badge>
							</TableCell>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</>
	)
}
export default Page
