import { getTestimonials } from '@/service/testimonials.service'
import FeaturesGuarantees from './_components/features-guarantees'
import Hero from './_components/hero'
import Testimonials from './_components/testimonials'

async function Page() {
	const testimonials = await getTestimonials()

	return (
		<>
			<Hero />
			<FeaturesGuarantees />
			<Testimonials testimonials={testimonials} />
		</>
	)
}

export default Page
