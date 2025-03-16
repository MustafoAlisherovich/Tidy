'use client'

import { servicesList } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { calculateTotalPrice } from '@/lib/utils'
import { orderSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import RequestDialogForm from './request-dialog-form'

const defaultValues: z.infer<typeof orderSchema> = {
	name: '',
	phone: '',
	address: '',
	services: [],
}
function OrderForm() {
	const t = useTranslate()
	const [isLoading, setIsLoading] = useState(false)
	const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
		null
	)
	const form = useForm<z.infer<typeof orderSchema>>({
		resolver: zodResolver(orderSchema),
		defaultValues,
	})

	const toggleService = (service: { name: string; price: number }) => {
		const currentServices = form.watch('services') as {
			name: string
			price: number
		}[]
		const isExist = currentServices.some(s => s.name === service.name)

		const newServices = isExist
			? currentServices.filter(s => s.name !== service.name)
			: [...currentServices, service]

		form.setValue('services', newServices, { shouldValidate: true })
	}

	const selectedServices = form.watch('services') as {
		name: string
		price: number
	}[]

	const totalPrice = calculateTotalPrice(selectedServices)

	const getLocation = () => {
		if (!navigator.geolocation) {
			toast.error('Brauzeringiz lokatsiyani qo‘llab-quvvatlamaydi')
			return
		}
		navigator.geolocation.getCurrentPosition(
			position => {
				const lat = parseFloat(position.coords.latitude.toFixed(6))
				const lng = parseFloat(position.coords.longitude.toFixed(6))
				setLocation({ lat, lng })
				toast.success('Lokatsiya aniqlandi!')
			},
			error => {
				console.error('Lokatsiyani olishda xatolik:', error)
				toast.error('Lokatsiyani olishda xatolik: ' + error.message)
			}
		)
	}

	const onSubmit = async (values: z.infer<typeof orderSchema>) => {
		setIsLoading(true)

		const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_SERVICE_BOT_API!
		const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_SERVICE_CHAT_ID!

		const servicesText = values.services
			.map(service => `${service.name} - ${service.price.toLocaleString()} UZS`)
			.join('\n')

		const locationText = location
			? `\n🗺 Lokatsiya: https://www.google.com/maps?q=${location.lat},${location.lng}`
			: ''

		const message = `📌 Buyurtma:\n\n👤 Ism: ${values.name}\n📞 Telefon: ${
			values.phone
		}\n📍 Manzil: ${
			values.address
		}\n✅ Xizmatlar:\n${servicesText}\n💰 Umumiy narx: ${totalPrice.toLocaleString()} UZS${locationText}`

		try {
			await fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ chat_id: telegramChatId, text: message }),
			})

			toast.success(
				"Buyurtma muvaffaqiyatli yuborildi. Siz bilan tez orada bog'lanamiz"
			)
			form.reset()
			setLocation(null)
		} catch (error) {
			toast.error("Xatolik yuz berdi, qayta urinib ko'ring!")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='container'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4 p-6 bg-white rounded-lg shadow-md'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('name')}</FormLabel>
								<FormControl>
									<Input placeholder={t('name')} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('telephoneNumber')}</FormLabel>
								<FormControl>
									<Input placeholder={t('telephoneNumber')} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('yourAdress')}</FormLabel>
								<FormControl>
									<Input placeholder={t('yourAdress')} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='button'
						onClick={getLocation}
						variant='outline'
						className='w-full flex items-center gap-2'
					>
						<MapPin className='w-5 h-5' /> Lokatsiyani yuborish
					</Button>
					{location && (
						<p className='text-sm text-green-600'>
							✅ Lokatsiya aniqlandi:{' '}
							<a
								href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
								target='_blank'
								className='underline'
							>
								Google Maps'da ko‘rish
							</a>
						</p>
					)}

					<div className='space-y-2'>
						<p className='font-medium'>{t('services')}:</p>
						{servicesList.map(service => (
							<div
								key={service.name}
								className='flex items-center justify-between p-2 border rounded-lg'
							>
								<span>
									{t(service.name)} -{' '}
									<strong>{service.price.toLocaleString()} UZS</strong>
								</span>
								<Button
									variant='ghost'
									onClick={e => {
										e.preventDefault()
										toggleService(service)
									}}
									className='p-2'
								>
									{selectedServices.some(s => s.name === service.name) ? (
										<X className='text-red-500' />
									) : (
										<Plus className='text-green-500' />
									)}
								</Button>
							</div>
						))}
					</div>
					{selectedServices.length > 0 && (
						<div className='text-lg font-semibold text-right'>
							{t('totalPrice')}: {totalPrice.toLocaleString()} UZS
						</div>
					)}

					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? 'Yuborilmoqda...' : 'Buyurtma berish'}
					</Button>
				</form>
			</Form>
			<RequestDialogForm />
		</div>
	)
}

export default OrderForm
