'use client'

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
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function SignInPage() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof loginSchema>) {}

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
									<Input placeholder='example@gmail.com' {...field} />
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
									<Input placeholder='*****' type='password' {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
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
