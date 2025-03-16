'use client'

import useTranslate from '@/hooks/use-translate'
import { requestDialogSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

function RequestDialogForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
		null
	)
	const t = useTranslate()

	const form = useForm<z.infer<typeof requestDialogSchema>>({
		resolver: zodResolver(requestDialogSchema),
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			about: '',
		},
	})

	// 📍 Foydalanuvchining joylashuvini olish
	const getLocation = () => {
		if (!navigator.geolocation) {
			toast.error('Brauzeringiz lokatsiyani qo‘llab-quvvatlamaydi')
			return
		}
		navigator.geolocation.getCurrentPosition(
			position => {
				const lat = position.coords.latitude
				const lng = position.coords.longitude
				setLocation({ lat, lng })
				toast.success('Lokatsiya aniqlandi!')
			},
			error => {
				toast.error('Lokatsiyani olishda xatolik: ' + error.message)
			}
		)
	}

	async function onSubmit(values: z.infer<typeof requestDialogSchema>) {
		setIsLoading(true)

		const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_SERVICE_BOT_API!
		const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_SERVICE_CHAT_ID!

		try {
			// 📩 1️⃣ Matnli xabar yuborish
			await fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: `
					👤 Ism: ${values.name}

					📞 Telefon: ${values.phone}

					📍 Manzil: ${values.address || 'Ko‘rsatilmagan'}

					📋 Ma'lumot: ${values.about}
					
					${
						location
							? `🗺 Lokatsiya: https://www.google.com/maps?q=${location.lat},${location.lng}`
							: ''
					}
					`,
				}),
			})

			// 📌 2️⃣ Agar lokatsiya mavjud bo‘lsa, uni Telegram'ga jo‘natish
			if (location) {
				await fetch(
					`https://api.telegram.org/bot${telegramBotId}/sendLocation`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							chat_id: telegramChatId,
							latitude: location.lat,
							longitude: location.lng,
						}),
					}
				)
			}

			form.reset()
			setLocation(null)
			toast.success(
				"Buyurtma muvaffaqiyatli yuborildi. Siz bilan tez orada bog'lanamiz"
			)
		} catch (error) {
			toast.error("Xatolik yuz berdi, qayta urinib ko'ring")
			console.error('Xatolik:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className='w-full'>
					So‘rov yuborish
				</Button>
			</DialogTrigger>
			<DialogContent className='p-6 space-y-4'>
				<DialogTitle>So‘rov yuborish</DialogTitle>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('name')}</FormLabel>
										<FormControl>
											<Input
												placeholder={t('name')}
												{...field}
												disabled={isLoading}
											/>
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
											<Input
												placeholder={t('telephoneNumber')}
												{...field}
												disabled={isLoading}
											/>
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
											<Input placeholder='Istiqlol 14' {...field} />
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
								<MapPin className='w-5 h-5' /> Lokatsiya jo'natish
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
							<FormField
								control={form.control}
								name='about'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tozalanadigan joy haqida ma'lumot</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Masalan: Office yig'ishtirish..."
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' disabled={isLoading} className='w-full'>
								{isLoading ? 'Yuborilmoqda...' : 'Yuborish'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default RequestDialogForm
