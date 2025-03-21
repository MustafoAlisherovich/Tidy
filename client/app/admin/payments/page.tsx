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

const Page = () => {
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
						<TableHead>Service</TableHead>
						<TableHead>Mijoz</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Provider</TableHead>
						<TableHead className='text-right'>Narx</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Service 1</TableCell>
						<TableCell>info@mustafoalisherovich.uz</TableCell>
						<TableCell>Tolangan</TableCell>
						<TableCell>Click</TableCell>
						<TableCell className='text-right'>100$</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={4} className='font-bold'>
							Umumiy
						</TableCell>
						<TableCell className='text-right'>100$</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	)
}
export default Page
