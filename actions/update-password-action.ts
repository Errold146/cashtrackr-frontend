"use server"

import getToken from "@/src/auth/token";
import { ErrorMessageSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export async function updatePassword(prevState: ActionStateType, formData: FormData) {
    const userPassword = UpdatePasswordSchema.safeParse({
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    })

    if ( !userPassword.success ) {
        return {
            errors: [],
            fieldErrors: userPassword.error.flatten().fieldErrors,
            success: ''
        }
    }

    // Almacenar el nuevo password
    const token = getToken()
    const url = `${process.env.API_URL}/auth/update-password`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            current_password: userPassword.data.current_password,
            password: userPassword.data.password
        })
    })

    const json = await req.json()
    if ( !req.ok ) {
        const { error } = ErrorMessageSchema.parse(json)
        return {
            errors: [error],
            fieldErrors: {},
            success: ''
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        fieldErrors: {},
        success
    }
}