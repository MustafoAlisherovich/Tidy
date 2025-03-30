import { getServices } from '@/actions/admin.action'
import { Separator } from '@/components/ui/separator'
import AddService from '../_components/add-service'
import ServiceTable from '../_components/service.table'

const Page = async () => {
	const res = await getServices({})
	const services = res?.data?.services

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-2xl font-semibold'>Xizmatlar</h1>
				<AddService />
			</div>

			<Separator className='my-3' />
			{services && services.length === 0 && (
				<p className='text-muted-foreground'>Xizmatlar topilmadi</p>
			)}
			<ServiceTable service={services && services} />
		</>
	)
}

export default Page
