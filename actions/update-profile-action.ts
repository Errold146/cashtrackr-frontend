"use server"

import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";
import { ErrorMessageSchema, SuccessSchema, UpdateProfileSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export async function updateProfile(prevState: ActionStateType, formData: FormData) {
    const profileData = UpdateProfileSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email')
    })

    if (!profileData.success) {
        return {
            errors: [],
            fieldErrors: profileData.error.flatten().fieldErrors,
            success: ''
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: profileData.data.name,
            email: profileData.data.email
        })
    })

    const json = await req.json()
    if (!req.ok) {
        const { error } = ErrorMessageSchema.parse(json)
        return {
            errors: [error],
            fieldErrors: {},
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)

    revalidatePath('/admin')

    return {
        errors: [],
        fieldErrors: {},
        success
    }
}