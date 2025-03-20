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

export const getLocation = (): Promise<{ lat: number; lng: number } | null> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error('Brauzeringiz lokatsiyani qo‘llab-quvvatlamaydi'))
			return
		}

		navigator.geolocation.getCurrentPosition(
			position => {
				const lat = parseFloat(position.coords.latitude.toFixed(6))
				const lng = parseFloat(position.coords.longitude.toFixed(6))
				resolve({ lat, lng })
			},
			error => {
				reject(new Error('Lokatsiyani olishda xatolik: ' + error.message))
			}
		)
	})
}

export const calculatePrice = (area: number): number => {
	const pricePerMeter = 2000
	return area * pricePerMeter
}
