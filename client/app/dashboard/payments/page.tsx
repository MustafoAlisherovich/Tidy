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
import { servicesHome } from '@/constants'
import { formatPrice } from '@/lib/utils'

const Page = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-2xl font-semibold'>To'lovlar</h1>
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableCaption>A list of your recent orders.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>Provider</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className='text-right'>Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{servicesHome.map(product => (
						<TableRow key={product._id}>
							<TableCell>{product.name}</TableCell>
							<TableCell>CLick</TableCell>
							<TableCell>Paid</TableCell>
							<TableCell className='text-right'>
								{formatPrice(product.price)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
