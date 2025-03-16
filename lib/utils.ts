import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function calculateTotalPrice(
	services: { name: string; price: number }[]
) {
	return services.reduce((acc, service) => acc + service.price, 0)
}
