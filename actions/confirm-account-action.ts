"use server"

import { ErrorMessageSchema, SuccessSchema, TokenSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export async function confirmAccount(token: string, prevState: ActionStateType) {
    
    const confirmToken = TokenSchema.safeParse(token)
    if ( !confirmToken.success ) {
        return {
            errors: confirmToken.error.issues.map(issue => issue.message),
            fieldErrors: {},
            success: ""
        }
    }

    // Confirma Usuario
    const url = `${process.env.API_URL}/auth/confirm-account`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            token: confirmToken.data
        })
    })

    const json = await req.json()

    if ( !req.ok ) {
        const { error } = ErrorMessageSchema.parse(json)
        return {
            errors: [error],
            fieldErrors: {},
            success: ""
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        fieldErrors: {},
        success: success
    }
}