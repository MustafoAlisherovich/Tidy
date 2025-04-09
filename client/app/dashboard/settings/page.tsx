'use client'

import { updatePassword, updateUser } from '@/actions/user.action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import UseAction from '@/hooks/use-action'
import { passwordSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const Page = () => {
	const { isLoading, onError, setIsLoading } = UseAction()

	const form = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { confirmPassword: '', newPassword: '', oldPassword: '' },
	})

	async function onDelete() {
		setIsLoading(true)
		const res = await updateUser({ isDeleted: true, deletedAt: new Date() })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError("Nimadir noto'g'ri ketdi!")
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success("Hisob raqam muvaffaqiyatli o'chirildi")
			setIsLoading(false)
			signOut({ callbackUrl: '/sign-up' })
		}
	}

	async function onSubmit(values: z.infer<typeof passwordSchema>) {
		setIsLoading(true)
		const res = await updatePassword(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError("Nimadir noto'g'ri ketdi!")
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success("Parol muvaffaqiyatli o'zgartirildi")
			setIsLoading(false)
			form.reset()
		}
	}

	return (
		<>
			<h1 className='text-2xl font-semibold'>Sozlamalar</h1>
			<Separator className='my-3' />
			<div className='p-4 bg-secondary flex flex-col space-y-0'>
				<div className='text-lg font-bold'>Delete account</div>
				<p className='text-sm text-muted-foreground'>
					Hisobingizni o'chirib tashlasangiz, barcha ma'lumotlaringiz bizning
					serverlarimizdan o'chiriladi.
				</p>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className='w-fit mt-3' size={'sm'} variant={'destructive'}>
							Accountni O'chirish
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Rostdan ham o'chirmoqchimisiz</AlertDialogTitle>
							<AlertDialogDescription>
								Bu amalni ortga qaytarib bo‘lmaydi. Bu sizning
								ma'lumotlaringizni butunlay o'chirib tashlaydi hisob
								qaydnomangiz va ma'lumotlaringizni serverlarimizdan olib
								tashlanadi.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isLoading}>Ortga</AlertDialogCancel>
							<AlertDialogAction disabled={isLoading} onClick={onDelete}>
								Davom etish
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
			<div className='p-4 bg-secondary mt-4'>
				<div className='w-1/2'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='oldPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>Eski parol</Label>
										<FormControl>
											<Input
												placeholder='****'
												type='password'
												className='bg-white'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>Yangi parol</Label>
										<FormControl>
											<Input
												placeholder='****'
												type='password'
												className='bg-white'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label>Parolni tasdiqlang</Label>
										<FormControl>
											<Input
												placeholder='****'
												type='password'
												className='bg-white'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<Button type='submit'>Yuborish</Button>
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}

export default Page
