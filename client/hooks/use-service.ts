import { IServices } from '@/types'
import { create } from 'zustand'

type Store = {
	service: IServices[] | null
	setService: (service: IServices[] | null) => void
	open: boolean
	setOpen: (open: boolean) => void
}

export const useService = create<Store>()(set => ({
	service: null,
	setService: service => set({ service }),
	open: false,
	setOpen: open => set({ open }),
}))
