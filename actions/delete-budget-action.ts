"use server"

import { revalidateTag } from "next/cache";

import getToken from "@/src/auth/token";
import { Budget, ErrorMessageSchema, PasswordValidationSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export async function deleteBudget(bugetId: Budget['id'], prevState: ActionStateType, formData: FormData) {
    
    const currentPassword = PasswordValidationSchema.safeParse(formData.get("password"))
    if ( !currentPassword.success ) {
        return {
            errors: currentPassword.error.issues.map(iss => iss.message),
            fieldErrors: {},
            success: ''
        }
    }

    //? Comprobar Password
    const token = getToken()
    const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
    const checkPasswordReq = await fetch(checkPasswordUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            password: currentPassword.data
        })
    })

    const checkPasswordJson = await checkPasswordReq.json()
    if ( !checkPasswordReq.ok ) {
        const { error } = ErrorMessageSchema.parse(checkPasswordJson)
        return {
            errors: [ error ],
            fieldErrors: {},
            success: ''
        }
    }

    //! Eliminar presupuesto
    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${bugetId}`
    const deleteBudgetReq = await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const deleteBudgetJson = await deleteBudgetReq.json()
    if ( !deleteBudgetReq.ok ) {
        const { error } = ErrorMessageSchema.parse(deleteBudgetJson)
        return {
            errors: [ error ],
            fieldErrors: {},
            success: ''
        }
    }

    revalidateTag('/all-budgets')
    const success = SuccessSchema.parse(deleteBudgetJson)

    return {
        errors: [],
        fieldErrors: {},
        success
    }
}