import { ThemeProvider } from '@/components/providers/theme-provider'
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
	title: 'Tide',
	description: 'Tide is the best choice for cleaning the house.',
}

export default function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${inter.variable} ${poppins.variable} overflow-x-hidden`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
