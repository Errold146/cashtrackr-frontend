"use server"

import getToken from "@/src/auth/token";
import { DraftBudgetSchema, SuccessSchema } from "@/src/schemas";
import { revalidateTag } from "next/cache";

type ActionStateType = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export async function createBudget(prevState: ActionStateType, formData: FormData) {
    
    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })
    
    if ( !budget.success ) {
        return {
            errors: [],
            fieldErrors: budget.error.flatten().fieldErrors,
            success: ''
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/budgets`

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
        })
    })

    const json = await req.json()
    
    if (!req.ok) {
        return {
            errors: [json.error || 'Error al crear el presupuesto'],
            fieldErrors: {},
            success: ''
        }
    }
    
    revalidateTag('/all-budgets')
    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        fieldErrors: {},
        success
    }
}