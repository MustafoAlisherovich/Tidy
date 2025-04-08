import { getServices } from '@/actions/user.action'
import ServiceCard from '@/components/card/service.card'

async function Page() {
	const res = await getServices({})
	const service = res.data?.services
	return (
		<>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-bold'>Xizmatlar</h1>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
				{service &&
					service.map(service => (
						<ServiceCard key={service._id} service={service} />
					))}
			</div>
		</>
	)
}

export default Page
