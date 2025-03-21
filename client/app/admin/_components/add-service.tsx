'use client'

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
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useService } from '@/hooks/use-product'
import { formatPrice } from '@/lib/utils'
import { addServiceSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddService = () => {
	const { open, setOpen } = useService()

	const form = useForm<z.infer<typeof addServiceSchema>>({
		resolver: zodResolver(addServiceSchema),
		defaultValues: {
			name: '',
			price: '',
			description: '',
		},
	})

	async function onSubmit(values: z.infer<typeof addServiceSchema>) {
		console.log(values)
	}

	function onOpen() {
		setOpen(true)
	}

	return (
		<>
			<Button size='sm' onClick={onOpen}>
				<span>Xizmat qo'shish</span>
				<PlusCircle className='m-1' />
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Xizmatni boshqarish</SheetTitle>
						<SheetDescription>
							* bilan belgilangan maydon majburiy maydonlar bo'lib,
							to'ldirilishi kerak.
						</SheetDescription>
					</SheetHeader>
					<Separator className='my-3' />
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Xizmat nomi</Label>
										<FormControl>
											<Input
												placeholder='Kir yuvish'
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>Tavsif</Label>
										<FormControl>
											<Textarea
												placeholder='Barcha kiyimlar Avtomat kirmashinasida yuviladi'
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem className='space-y-0'>
										<Label className='text-xs'>
											{!form.watch('price')
												? 'Price'
												: `Price ${formatPrice(Number(form.watch('price')))} `}
										</Label>
										<FormControl>
											<Input
												placeholder='100.000 UZS'
												type='number'
												className='bg-secondary'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full'>
								Qo'shish
							</Button>
						</form>
					</Form>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default AddService
