"use client"

import { useFormState } from "react-dom";

import { Budget } from "@/src/schemas";
import { BudgetForm } from "./BudgetForm";
import { editBudget } from "@/actions/edit-budget-action";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function EditBudgetForm({budget}: {budget: Budget}) {

    const router = useRouter()
    const editBudgetID = editBudget.bind(null, budget.id)
    const [state, dispatch] = useFormState(editBudgetID, {
        errors: [],
        fieldErrors: {},
        success: ''
    } as const)

    useEffect(() => {
        // Solo mostrar toast para errores generales (no de campos)
        if ( state.errors.length > 0 ) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
    }, [state.errors])

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.push('/admin')
        }
    }, [state.success]) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
            <BudgetForm budget={budget} fieldErrors={state.fieldErrors} />
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 transition-colors duration-300 cursor-pointer"
                value='Editar Presupuesto'
            />
        </form>
    )
}
