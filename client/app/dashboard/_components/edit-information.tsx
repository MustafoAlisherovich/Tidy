'use client'

import { updateUser } from '@/actions/user.action'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import UseAction from '@/hooks/use-action'
import { UploadDropzone } from '@/lib/uploadthing'
import { IUser } from '@/types'
import { Edit2, Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { toast } from 'sonner'
import EmailForm from './email.form'
import FullNameForm from './full-name.form'

interface Props {
	user: IUser
}

const EditInformation: FC<Props> = ({ user }) => {
	const [onOpen, setOnOpen] = useState(false)
	const { update } = useSession()

	const { isLoading, onError, setIsLoading } = UseAction()

	const onUpdateAvatar = async (avatar: string, avatarKey: string) => {
		setIsLoading(true)
		const res = await updateUser({ avatar, avatarKey })

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError("Nimadir noto'g'ri ketdi!")
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success("Muvaffaqiyatli o'zgartirildi")
			update()
			setOnOpen(false)
			setIsLoading(false)
		}
	}

	return (
		<>
			<div className='w-full h-52 bg-secondary flex justify-center items-center'>
				<div className='relative'>
					{isLoading && (
						<Skeleton className='absolute inset-0 bg-secondary z-50 flex items-center justify-center'>
							<Loader className='animate-spin' />
						</Skeleton>
					)}
					<Avatar className='size-32'>
						<AvatarImage src={user.avatar} alt={user.fullName} />
						<AvatarFallback className='bg-primary text-white text-6xl'>
							{user.fullName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<Dialog open={onOpen} onOpenChange={setOnOpen}>
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
								<p className='text-muted-foreground'>{user.fullName}</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<FullNameForm user={user} />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>
							<div className='flex flex-col space-y-0'>
								<h2 className='font-bold'>Email manzil</h2>
								<p className='text-muted-foreground'>{user.email}</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-4'>
							<EmailForm user={user} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	)
}

export default EditInformation
