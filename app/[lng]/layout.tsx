import { Toaster } from '@/components/ui/sonner'
import { languages } from '@/i18n/settings'
import { ChildProps } from '@/types'
import { dir } from 'i18next'
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

export async function generateStaticParams() {
	return languages.map(lng => ({ lng }))
}

export const metadata: Metadata = {
	title: 'Tidy',
	description: 'Tidy is the best choice for cleaning the house.',
	icons: { icon: '/logo.jpg' },
}

interface Props extends ChildProps {
	params: Promise<{ lng: string }>
}

async function RootLayout({ children, params }: Props) {
	const { lng } = await params // ✅ `params` ni `await` qildik

	return (
		<html lang={lng} dir={dir(lng)} suppressHydrationWarning>
			<body
				className={`${inter.variable} ${poppins.variable} overflow-x-hidden`}
			>
				{children}
				<Toaster position='top-center' />
			</body>
		</html>
	)
}

export default RootLayout
