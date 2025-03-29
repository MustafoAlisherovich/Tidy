'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const UseAction = () => {
	const [isLoading, setIsLoading] = useState(false)

	function onError(message: string) {
		setIsLoading(false)
		toast.error(message)
	}

	return { isLoading, setIsLoading, onError }
}

export default UseAction
