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

const Page = () => {
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
					<TableRow>
						<TableCell>1</TableCell>
						<TableCell>info@mustafoalisherovich.uz</TableCell>
						<TableCell>Mustafo Juraboev</TableCell>
						<TableCell>12</TableCell>
						<TableCell>Faol</TableCell>
						<TableCell className='text-right'>$1200</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

export default Page
