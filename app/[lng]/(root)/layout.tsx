import LiveChat from '@/components/shared/live-chat'
import { ChildProps } from '@/types'
import Navbar from './_components/navbar'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
			<LiveChat />
		</div>
	)
}

export default Layout
