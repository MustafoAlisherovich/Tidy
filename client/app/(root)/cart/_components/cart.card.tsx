import { Button } from '@/components/ui/button'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { IService } from '@/types'
import { CircleHelp, Trash2 } from 'lucide-react'

interface Props extends IService {
	quantity: number
}

const CartCard = (item: Props) => {
	const { removeFromCart } = useCart()

	return (
		<div className='grid grid-cols-3 gap-4 rounded-md p-4 shadow-md max-md:grid-cols-1'>
			{/* Left section - service name & description */}
			<div className='col-span-2 flex items-center gap-2'>
				<div className='flex flex-col'>
					<h1 className='font-space-grotesk text-lg font-bold'>
						{item.name}
						{item.description && (
							<HoverCard>
								<HoverCardTrigger asChild>
									<Button size='icon' variant='ghost'>
										<span>
											<CircleHelp size={16} />
										</span>
									</Button>
								</HoverCardTrigger>
								<HoverCardContent>{item.description}</HoverCardContent>
							</HoverCard>
						)}
						{item.quantity > 1 && ` (${item.quantity})`}
					</h1>

					{/* Price for mobile */}
					<h1 className='font-space-grotesk font-bold block md:hidden mt-2'>
						{formatPrice(item.price * item.quantity)}
					</h1>
				</div>
			</div>

			{/* Right section - price & delete button */}
			<div className='flex flex-col justify-between items-end gap-2'>
				{/* Price for desktop */}
				<h1 className='font-poppins text-xl font-bold hidden md:block'>
					{formatPrice(item.price * item.quantity)}
				</h1>

				<Button
					variant='destructive'
					size='icon'
					className='w-10 h-10'
					onClick={() => removeFromCart(item._id)}
				>
					<Trash2 className='size-5' />
				</Button>
			</div>
		</div>
	)
}

export default CartCard
