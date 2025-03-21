'use client'

import { servicesHome } from '@/constants'
import { Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'

interface Service {
	_id: number
	name: string
	price: number
}

function OrderForm() {
	const router = useRouter()
	const [selectedServices, setSelectedServices] = useState<Service[]>([])

	const addService = (service: Service) => {
		if (!selectedServices.find(s => s._id === service._id)) {
			setSelectedServices([...selectedServices, service])
		}
	}

	const removeService = (id: number) => {
		setSelectedServices(selectedServices.filter(service => service._id !== id))
	}

	const totalPrice = selectedServices.reduce(
		(acc, service) => acc + service.price,
		0
	)

	return (
		<div className='max-w-4xl mx-auto p-4 sm:p-6 space-y-6'>
			<h2 className='text-xl font-bold text-center'>Xizmatlar</h2>

			{/* Xizmatlar ro‘yxati */}
			<div className='overflow-x-auto'>
				<Table className='text-sm'>
					<TableHeader>
						<TableRow>
							<TableHead className='w-1/2'>Xizmat nomi</TableHead>
							<TableHead className='w-1/4 text-center'>Narxi</TableHead>
							<TableHead className='w-1/4 text-center'>Qo‘shish</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{servicesHome.map(service => (
							<TableRow key={service._id}>
								<TableCell>{service.name}</TableCell>
								<TableCell className='text-center'>
									{service.price.toLocaleString()} so‘m
								</TableCell>
								<TableCell className='text-center'>
									<Button
										onClick={() => addService(service)}
										variant='outline'
										size='sm'
									>
										<Plus className='w-5 h-5' />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Tanlangan xizmatlar */}
			<div>
				<h3 className='text-lg font-semibold mb-2'>Tanlangan xizmatlar:</h3>
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='w-1/2'>Xizmat nomi</TableHead>
								<TableHead className='w-1/4 text-center'>Narxi</TableHead>
								<TableHead className='w-1/4 text-center'>O‘chirish</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{selectedServices.length > 0 ? (
								selectedServices.map(service => (
									<TableRow key={service._id}>
										<TableCell>{service.name}</TableCell>
										<TableCell className='text-center'>
											{service.price.toLocaleString()} so‘m
										</TableCell>
										<TableCell className='text-center'>
											<Button
												onClick={() => removeService(service._id)}
												variant='destructive'
												size='sm'
											>
												<Trash2 className='w-5 h-5' />
											</Button>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={3} className='text-center text-gray-500'>
										Tanlangan xizmatlar yo‘q
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				{/* Umumiy narx */}
				<div className='text-lg font-bold text-right mt-4'>
					Umumiy: {totalPrice.toLocaleString()} so‘m
				</div>
				<Button className='mt-2' onClick={() => router.push('/checkout')}>
					Keyingisi
				</Button>
			</div>
		</div>
	)
}

export default OrderForm
