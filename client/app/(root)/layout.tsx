import { ChildProps } from '@/types'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<main>{children}</main>
		</div>
	)
}

export default Layout
