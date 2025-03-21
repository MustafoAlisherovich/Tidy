import { Separator } from '@/components/ui/separator'
import { servicesHome } from '@/constants'
import AddService from '../_components/add-service'
import ServiceTable from '../_components/service.table'

const Page = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-2xl font-semibold'>Xizmatlar</h1>
				<AddService />
			</div>

			<Separator className='my-3' />

			<ServiceTable service={servicesHome} />
		</>
	)
}

export default Page
