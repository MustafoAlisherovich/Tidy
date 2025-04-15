import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { IFaq } from '@/types'

interface Props {
	faq: IFaq[]
}

const Faq = ({ faq }: Props) => {
	return (
		<div className='max-w-3xl mx-auto p-4'>
			<h2 className='text-center text-2xl font-bold mb-6 max-sm:text-xl font-poppins'>
				Ko‘p so‘raladigan savollar
			</h2>
			<Accordion
				type='single'
				collapsible
				className='w-full space-y-3'
				defaultValue=''
			>
				{faq.map((item, index) => (
					<AccordionItem value={`item-${index}`} key={index}>
						<AccordionTrigger className='text-left text-lg sm:text-xl cursor-pointer'>
							{item.title}
						</AccordionTrigger>
						<AccordionContent>
							<p className='text-muted-foreground text-sm sm:text-base pt-2 leading-relaxed'>
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
