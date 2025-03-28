'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-toke'
import { actionClient } from '@/lib/safe-action'
import { addServiceSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const getServices = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/admin/services', {
		headers: { Authorization: `Bearer ${token}` },
	})
	return JSON.parse(JSON.stringify(data))
})

export const createService = actionClient
	.schema(addServiceSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/api/admin/create-service',
			{
				...parsedInput,
				price: parseFloat(parsedInput.price),
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		revalidatePath('/admin/services')
		return JSON.parse(JSON.stringify(data))
	})
