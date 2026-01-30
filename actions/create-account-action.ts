"use server"

import { ErrorMessageSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[]
    fieldErrors?: {
        email?: string[]
        name?: string[]
        password?: string[]
        password_confirmation?: string[]
    },
    success: string
    warning: string
} 

export async function register(prevState: ActionStateType, formData: FormData) {
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    }

    // Validar
    const result = RegisterSchema.safeParse(registerData)
    
    if ( !result.success ) {
        const errors = result.error.errors.map(error => error.message)
        return {
            errors,
            fieldErrors: result.error.flatten().fieldErrors,
            success: prevState.success,
            warning: prevState.warning
        }
    }
    
    // Registrar el usuario
    const url = `${process.env.API_URL}/auth/create-account`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        })
    })

    const json = await req.json()
    
    if ( req.status === 409 ) {
        const { error } = ErrorMessageSchema.parse(json)
        return {
            errors: [],
            fieldErrors: {},
            success: prevState.success,
            warning: error
        }
    }

    const success = SuccessSchema.parse(json)

    return {
        errors: prevState.errors,
        fieldErrors: {},
        success,
        warning: ''
    }
}