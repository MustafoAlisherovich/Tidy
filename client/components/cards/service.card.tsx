'use client'

import { addFavorite } from '@/actions/user.action'
import UseAction from '@/hooks/use-action'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { IService } from '@/types'
import { CircleHelp, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

interface Props {
	service: IService
}

const ServiceCard: FC<Props> = ({ service }) => {
	const { onError, isLoading, setIsLoading } = UseAction()
	const { addToCart } = useCart()
	const router = useRouter()
	const { data: session, status } = useSession()

	const onCart = () => {
		if (status !== 'authenticated') {
			return toast.error('Siz tizimga kirmagansiz!')
		}

		setIsLoading(true)
		addToCart(service)
		router.push('/cart')
	}

	const onFavorite = async () => {
		setIsLoading(true)
		try {
			const res = await addFavorite({ id: service._id })

			if (res?.serverError || res?.validationErrors || !res?.data) {
				return onError('Nimadir xato ketdi')
			}
			if (res.data.failure) {
				return onError(res.data.failure)
			}
			if (res.data.status === 200) {
				toast.success("Sevimlilarga qo'shildi")
			}
		} catch (error) {
			onError('Server bilan aloqa uzildi')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card className='w-full max-w-xs mx-auto relative'>
			<Button
				variant='ghost'
				size='icon'
				className='absolute top-2 right-2 z-10'
				onClick={onFavorite}
				disabled={isLoading}
			>
				<Heart className='text-red-500' />
			</Button>

			<CardContent className='py-4'>
				<div className='my-3 flex flex-col space-y-3'>
					<div className='col-span-2 flex items-center gap-2'>
						<div className='flex flex-col'>
							<h1 className='font-space-grotesk text-lg font-bold'>
								{service.name}
								{service.description && (
									<HoverCard>
										<HoverCardTrigger asChild>
											<Button size='icon' variant='ghost'>
												<span>
													<CircleHelp size={16} />
												</span>
											</Button>
										</HoverCardTrigger>
										<HoverCardContent>{service.description}</HoverCardContent>
									</HoverCard>
								)}
							</h1>

							{/* Price for mobile */}
							<h1 className='font-space-grotesk font-bold block md:hidden mt-2'>
								{formatPrice(service.price)}
							</h1>
						</div>
					</div>

					<div className='flex flex-col justify-between items-end gap-2'>
						{/* Price for desktop */}
						<h1 className='font-poppins text-xl font-bold hidden md:block'>
							{formatPrice(service.price)}
						</h1>

						<Button
							className='mt-2'
							size='sm'
							onClick={onCart}
							disabled={isLoading}
						>
							Buyurtma berish
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default ServiceCard
