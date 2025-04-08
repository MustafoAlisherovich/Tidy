'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { UploadDropzone } from '@/lib/uploadthing'
import { IUser } from '@/types'
import { Edit2 } from 'lucide-react'
import { FC } from 'react'
import EmailForm from './email.form'
import FullNameForm from './full-name.form'

interface Props {
	user: IUser
}

const EditInformation: FC<Props> = ({ user }) => {
	const onUpdateAvatar = async (avatar: string, avatarKey: string) => {}

	return (
		<>
			<div className='w-full h-52 bg-secondary flex justify-center items-center'>
				<div className='relative'>
					<Avatar className='size-32'>
						<AvatarFallback className='bg-primary text-white text-6xl'>
							CN
						</AvatarFallback>
					</Avatar>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								size={'icon'}
								className='absolute right-0 bottom-0 rounded-full border border-prima	ry'
								variant={'secondary'}
							>
								<Edit2 />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle />
							</DialogHeader>
							<UploadDropzone
								endpoint={'imageUploader'}
								config={{ appendOnPaste: true, mode: 'auto' }}
								appearance={{ container: { height: 200, padding: 10 } }}
								onClientUploadComplete={res =>
									onUpdateAvatar(res[0].url, res[0].key)
								}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<div className='my-3 bg-secondary px-4'>
				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							<div className='flex flex-col space-y-0'>
								<h2 className='font-bold'>To'liq ism</h2>
								<p className='text-muted-foreground'>Mustafo Juraboev</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<FullNameForm />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>
							<div className='flex flex-col space-y-0'>
								<h2 className='font-bold'>Email manzil</h2>
								<p className='text-muted-foreground'>
									info@mustafoalisherovic.uz
								</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<EmailForm />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	)
}

export default EditInformation
