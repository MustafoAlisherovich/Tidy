import { IService } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ICart extends IService {
	quantity: number
}

interface ICartStore {
	carts: ICart[]
	addToCart: (service: IService) => void
	removeFromCart: (id: string) => void
	increment: (id: string) => void
	decrement: (id: string) => void
	totalPrice: () => number
	cartsLength: () => number
	clearCart: () => void
}

export const useCart = create<ICartStore>()(
	persist(
		(set, get) => ({
			carts: [],
			addToCart: (service: IService) => {
				const { carts } = get()
				const existing = carts.find(cart => cart._id === service._id)
				if (existing) {
					set(state => {
						const newCarts = state.carts.map(cart => {
							if (cart._id === service._id) {
								return { ...cart, quantity: cart.quantity + 1 }
							}
							return cart
						})
						return { carts: newCarts }
					})
				} else {
					set({ carts: [...carts, { ...service, quantity: 1 }] })
				}
			},
			removeFromCart: (id: string) => {
				const { carts } = get()
				const newCarts = carts.filter(cart => cart._id !== id)
				set({ carts: newCarts })
			},
			increment: (id: string) => {
				const { carts } = get()
				const newCarts = carts.map(cart => {
					if (cart._id === id) {
						return { ...cart, quantity: cart.quantity + 1 }
					}
					return cart
				})
				set({ carts: newCarts })
			},
			decrement: (id: string) => {
				const { carts } = get()
				const newCarts = carts.map(cart => {
					if (cart._id === id) {
						return { ...cart, quantity: cart.quantity - 1 }
					}
					return cart
				})
				set({ carts: newCarts })
			},
			totalPrice: () => {
				const { carts } = get()
				return carts.reduce((acc, cart) => acc + cart.price * cart.quantity, 0)
			},
			cartsLength: () => {
				return get().carts.reduce((acc, cart) => acc + cart.quantity, 0)
			},
			clearCart: () => set({ carts: [] }),
		}),
		{
			name: 'cart-storage',
		}
	)
)
