import { getStatistics } from '@/actions/user.action'
import { Separator } from '@/components/ui/separator'
import { authOptions } from '@/lib/auth-options'
import { Banknote, Heart, Shuffle } from 'lucide-react'
import { getServerSession } from 'next-auth'
import EditInformation from '../_components/edit-information'

const Page = async () => {
	const session = await getServerSession(authOptions)
	const res = await getStatistics({})

	const statistics = res?.data?.statistics

	return (
		<>
			<h1 className='text-2xl font-semibold'>Personal information</h1>
			<Separator className='my-2' />

			<EditInformation
				user={JSON.parse(JSON.stringify(session?.currentUser))}
			/>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
				<div className='border-2 p-4 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer rounded-lg'>
					<Shuffle size={40} />
					<div className='text-center'>
						<h1 className='text-3xl font-bold'>{statistics?.totalOrders}</h1>
						<p className='text-sm'>Buyurtmalar</p>
					</div>
				</div>

				<div className='border-2 p-4 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer rounded-lg'>
					<Banknote size={40} />
					<div className='text-center'>
						<h1 className='text-3xl font-bold'>
							{statistics?.totalTransactions}
						</h1>
						<p className='text-sm'>To'lovlar</p>
					</div>
				</div>

				<div className='border-2 p-4 flex justify-center flex-col space-y-2 items-center shadow-md hover:animate-pulse transition-all cursor-pointer rounded-lg'>
					<Heart size={40} />
					<div className='text-center'>
						<h1 className='text-3xl font-bold'>
							{statistics?.totalFavourites}
						</h1>
						<p className='text-sm'>Sevimli xizmatlar</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
