"use server"

import getToken from "@/src/auth/token";
import { Budget, DraftExpenseSchema, ErrorMessageSchema, Expense, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseId = {
    budgetId: Budget['id']
    expenseId: Expense['id']
}

type ActionStateType = {
    errors: Record<string, string[]>
    success: string
}

export async function editExpense(
    {budgetId, expenseId}: BudgetAndExpenseId, 
    prevState: ActionStateType, 
    formData: FormData
) {
    const expense = DraftExpenseSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount'),
    })

    if ( !expense.success ) {
        const fieldErrors: Record<string, string[]> = {}
        expense.error.errors.forEach(err => {
            const field = err.path[0] as string
            if (!fieldErrors[field]) {
                fieldErrors[field] = []
            }
            fieldErrors[field].push(err.message)
        })
        return {
            errors: fieldErrors,
            success: ''
        }
    }

    // Actualizar gasto
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
    })

    const json = await req.json()
    if ( !req.ok ) {
        const { error } = ErrorMessageSchema.parse(json)
        return {
            errors: { message: [error] },
            success: ''
        }
    }

    revalidatePath(`/admin/budgets/${budgetId}`)
    const success = SuccessSchema.parse(json)

    return {
        errors: {},
        success
    }
}