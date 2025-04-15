import { getFaqs } from '@/service/faq.service'
import { getFeatures } from '@/service/feature.service'
import { getTestimonials } from '@/service/testimonials.service'
import Faq from './_components/faq'
import FeaturesGuarantees from './_components/features-guarantees'
import Hero from './_components/hero'
import Testimonials from './_components/testimonials'

async function Page() {
	const testimonials = await getTestimonials()
	const faq = await getFaqs()
	const features = await getFeatures()

	return (
		<>
			<Hero />
			<FeaturesGuarantees features={features} />
			<Testimonials testimonials={testimonials} />
			<Faq faq={faq} />
		</>
	)
}

export default Page
