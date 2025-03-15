import LiveChat from '@/components/shared/live-chat'
import { ChildProps } from '@/types'
import Footer from './_components/footer'
import Navbar from './_components/navbar'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
			<LiveChat />
			<Footer />
		</div>
	)
}

export default Layout
