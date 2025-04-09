import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { faq } from '@/constants'

const Faq = () => {
	return (
		<div className='max-w-3xl mx-auto p-4'>
			<h2 className='text-2xl font-bold mb-6 text-center'>
				Ko‘p so‘raladigan savollar
			</h2>
			<Accordion
				type='single'
				collapsible
				className='w-full space-y-2'
				defaultValue=''
			>
				{faq.map((item, index) => (
					<AccordionItem value={`item-${index}`} key={index}>
						<AccordionTrigger className='text-left text-xl cursor-pointer'>
							{item.title}
						</AccordionTrigger>
						<AccordionContent>
							<p className='text-muted-foreground text-base pt-2'>
								{item.description}
							</p>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

export default Faq
