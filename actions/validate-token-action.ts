"use server"

import { ErrorMessageSchema, SuccessSchema, TokenSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export async function validateToken(token: string, prevState: ActionStateType) {
    
    const resetPasswordToken = TokenSchema.safeParse(token)
    if ( !resetPasswordToken.success ) {
        return {
            errors: resetPasswordToken.error.issues.map(issue => issue.message),
            fieldErrors: {},
            success: ''
        }
    }

    const url = `${process.env.API_URL}/auth/validate-token`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: resetPasswordToken.data
        })
    })

    const json = await req.json()
    if ( !req.ok ) {
        const { error } = ErrorMessageSchema.parse(json)
        return {
            errors: [ error ],
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