import { getFavourites } from '@/actions/user.action'
import WatchListTable from '@/components/table/watch-list.table'
import { Separator } from '@/components/ui/separator'

const Page = async () => {
	const res = await getFavourites({})
	const services = res?.data?.services

	return (
		<>
			<h1 className='text-xl font-bold'>Sevimli xizmatlar</h1>

			<Separator className='my-3' />

			{services && services.length === 0 && (
				<div className='text-center mt-3'>Xizmat topilmadi</div>
			)}
			{services &&
				services.map(service => (
					<WatchListTable key={service._id} service={service} />
				))}
		</>
	)
}

export default Page
