import WatchListTable from '@/components/table/watch-list.table'
import { Separator } from '@/components/ui/separator'
import { servicesHome } from '@/constants'

const Page = () => {
	return (
		<>
			<h1 className='text-xl font-bold'>Ro'yxat</h1>

			<Separator className='my-3' />

			<WatchListTable service={servicesHome} />
		</>
	)
}

export default Page
