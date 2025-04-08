'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-toke'
import { actionClient } from '@/lib/safe-action'
import { idSchema, updateUserSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'

export const getServices = actionClient.action<ReturnActionType>(async () => {
	const { data } = await axiosClient.get('/api/user/services', {})
	return JSON.parse(JSON.stringify(data))
})

export const addFavorite = actionClient
	.schema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser)
			return { failure: 'You must be logged in to add a favorite' }
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/api/user/add-favorite',
			{ productId: parsedInput.id },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		return JSON.parse(JSON.stringify(data))
	})

export const deleteFavorite = actionClient
	.schema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.post(
			'/api/user/delete-favorite',
			{ productId: parsedInput.id },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		return JSON.parse(JSON.stringify(data))
	})

export const updateUser = actionClient
	.schema(updateUserSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser)
			return { failure: 'You must be logged in to add a favorite' }
		const token = await generateToken(session?.currentUser?._id)
		const { data } = await axiosClient.put(
			'/api/user/update-profile',
			parsedInput,
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		return JSON.parse(JSON.stringify(data))
	})
