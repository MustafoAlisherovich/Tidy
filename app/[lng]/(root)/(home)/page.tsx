import { translation } from '@/i18n/server'
import { LngParams } from '@/types'

async function Page({ params: { lng } }: LngParams) {
	const { t } = await translation(lng)

	return <div className='mt-24'>{t('home')}</div>
}

export default Page
