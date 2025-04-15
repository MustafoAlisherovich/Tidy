import { getFavourites } from '@/actions/user.action'
import WatchListTable from '@/components/table/watch-list.table'
import { Separator } from '@/components/ui/separator'

const Page = async () => {
	const res = await getFavourites({})
	const services = res?.data?.services

	return (
		<>
			<h1 className='text-xl md:text-2xl font-bold'>Sevimli xizmatlar</h1>

			<Separator className='my-3' />

			{services && services.length === 0 && (
				<div className='text-center mt-4 text-sm text-muted-foreground'>
					Xizmat topilmadi
				</div>
			)}

			<div className='space-y-2'>
				{services &&
					services.map(service => (
						<div key={service._id} className='rounded-md border p-2 shadow-sm'>
							<WatchListTable service={service} />
						</div>
					))}
			</div>
		</>
	)
}

export default Page
