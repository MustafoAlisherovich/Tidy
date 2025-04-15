import { getServices } from '@/actions/user.action'
import ServiceCard from '@/components/cards/service.card'

async function Page() {
	const res = await getServices({})
	const service = res.data?.services
	return (
		<>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-bold'>Xizmatlar</h1>
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4'>
				{service &&
					service.map(service => (
						<ServiceCard key={service._id} service={service} />
					))}
			</div>
		</>
	)
}

export default Page
