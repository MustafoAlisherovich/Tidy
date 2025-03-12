import Link from 'next/link'

function Logo() {
	return (
		<Link href={'/'} className='flex items-center gap-2'>
			<h1 className='font-poppins text-4xl font-bold text-green-500'>Tide</h1>
		</Link>
	)
}

export default Logo
