import Footer from '@/components/shared/footer'
import LiveChat from '@/components/shared/live-chat'
import Navbar from '@/components/shared/navbar'
import { Toaster } from '@/components/ui/sonner'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-inter',
	subsets: ['latin', 'cyrillic'],
})

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-poppins',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Tidy',
	description: 'Tidy is the best choice for cleaning the house.',
	icons: { icon: '/logo.jpg' },
}

async function RootLayout({ children }: ChildProps) {
	return (
		<html lang={'en'} suppressHydrationWarning>
			<body
				className={`${inter.variable} ${poppins.variable} overflow-x-hidden`}
			>
				<Navbar />
				<main>{children}</main>
				<Toaster position='top-center' />
				<LiveChat />
				<Footer />
			</body>
		</html>
	)
}

export default RootLayout
