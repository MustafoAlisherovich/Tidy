'use client'

import NoSSR from '@/components/shared/no-ssr'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import CartCard from './_components/cart.card'

const Page = () => {
	const { carts, totalPrice } = useCart()

	return (
		<div className='container mx-auto mt-12 max-w-3xl'>
			<div className='grid grid-cols-3 gap-2 max-md:grid-cols-1'>
				<Card className='col-span-2 '>
					<CardContent className='py-4'>
						{carts.length > 0 && (
							<>
								<h1 className='font-poppins text-xl font-bold'>Xarid Savati</h1>

								<p>Xizmat soni {carts.length}</p>
							</>
						)}
						{carts.length === 0 && (
							<>
								<h1 className='text-center'>Hech narsa topilmadi</h1>
							</>
						)}

						<div className='my-3 flex flex-col space-y-3'>
							{carts.map(cart => (
								<CartCard key={cart._id} {...cart} />
							))}
						</div>
					</CardContent>
				</Card>

				<div>
					<Card>
						<CardContent className='py-4'>
							<h1 className='font-poppins text-xl font-bold'>Natija</h1>
							<Separator className='my-3' />
							<div className='flex items-center justify-between text-sm'>
								<div className='font-poppins font-bold'>Jami</div>
								<NoSSR>
									<div className='font-medium'>{formatPrice(totalPrice())}</div>
								</NoSSR>
							</div>

							{carts.length ? (
								<Button
									asChild
									className='group mt-3 w-full px-4 py-2 font-bold font-poppins'
								>
									<Link
										href='/cart/checkout'
										className='flex w-full items-center justify-between gap-2'
									>
										<span className='text-sm truncate'>
											{formatPrice(totalPrice())}
										</span>
									</Link>
								</Button>
							) : null}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Page
