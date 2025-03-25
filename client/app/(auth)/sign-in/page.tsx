'use client'

import { login } from '@/actions/auth.action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function SignInPage() {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onError(message: string) {
		setIsLoading(false)
		toast.error(message)
	}

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsLoading(true)
		const res = await login(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError("Nimadir noto'g'ri ketdi!")
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.user) {
			toast.success('Muvaffaqiyatli kirdingiz')
			signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
		}
	}

	return (
		<Card className='w-1/2 p-4 container max-w-6xl mt-24'>
			<h1 className='text-xl font-bold'>Tizmiga Kirish</h1>
			<p className='text-sm text-muted-foreground'>
				Qaytganingiz bilan! Iltimos qaytadan accountingizga kiring
			</p>
			<Separator className='my-3' />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<Label>Email</Label>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										{...field}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<Label>Parol</Label>
								<FormControl>
									<Input
										placeholder='*****'
										type='password'
										{...field}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						Submit {isLoading && <Loader className='animate-spin' />}
					</Button>
				</form>
			</Form>
			<div className='mt-4'>
				<div className='text-sm text-muted-foreground'>
					Accountingiz yo'qmi{' '}
					<Button asChild variant={'link'} className='p-0'>
						<Link href='/sign-up'>Ro'yxatdan O'tish</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default SignInPage
