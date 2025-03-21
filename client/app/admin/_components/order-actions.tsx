import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { EllipsisVertical } from 'lucide-react'

const OrderActions = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size={'icon'} className='size-6' variant={'outline'}>
					<EllipsisVertical />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-50 p-1' side='right'>
				<div className='flex flex-col space-y-0'>
					<Button size={'sm'} className='justify-start' variant='ghost'>
						1. Buyurtmani tasdiqlash
					</Button>
					<Button size={'sm'} className='justify-start' variant='ghost'>
						2. Yetkazishni boshlash
					</Button>
					<Button size={'sm'} className='justify-start' variant='ghost'>
						3. Yetkazib berish jarayoni
					</Button>
					<Button size={'sm'} className='justify-start' variant='ghost'>
						4. To'liq yetkazib berish
					</Button>
					<Button size={'sm'} className='justify-start' variant='ghost'>
						5. Yetkazib berilgan
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default OrderActions
