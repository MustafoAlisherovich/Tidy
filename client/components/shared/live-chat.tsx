'use client'

import { useEffect } from 'react'

const TAWK_TO_ID = process.env.NEXT_PUBLIC_TAWK_TO_ID
const TAWK_TO_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID

export default function LiveChat() {
	useEffect(() => {
		if (!TAWK_TO_ID || !TAWK_TO_WIDGET_ID) return

		const script = document.createElement('script')
		script.src = `https://embed.tawk.to/${TAWK_TO_ID}/${TAWK_TO_WIDGET_ID}`
		script.async = true
		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [])

	return null
}
