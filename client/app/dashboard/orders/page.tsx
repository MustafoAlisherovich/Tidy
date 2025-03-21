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
				<h1 className='text-2xl font-semibold'>Buyurtmalar</h1>
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableCaption>Sizning oxirgi buyurtmangiz ro'yxati.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Narx</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Xizmat</TableHead>
						<TableHead>Buyurtma vaqti</TableHead>
						<TableHead className='text-right'>Yangilangan vaqti</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{servicesHome.map(product => (
						<TableRow key={product._id}>
							<TableCell>{formatPrice(product.price)}</TableCell>
							<TableCell>To'langan</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell>10-Nov 2024</TableCell>
							<TableCell className='text-right'>12-Nov 12:30 pm</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
