"use server"

import { ErrorMessageSchema, ForgotPasswordSchema, SuccessSchema } from "@/src/schemas"

export type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export async function forgotPassword(prevState: ActionStateType, forData: FormData): Promise<ActionStateType> {
    
    const forgotPass = ForgotPasswordSchema.safeParse({
        email: forData.get('email')
    })

    if ( !forgotPass.success ) {
        return {
            errors: [],
            fieldErrors: forgotPass.error.flatten().fieldErrors,
            success: ''
        }
    }

    const url = `${process.env.API_URL}/auth/forgot-password`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: forgotPass.data.email
        })

    })

    const json = await req.json()
    if ( !req.ok ) {
        const {error} = ErrorMessageSchema.parse(json)
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