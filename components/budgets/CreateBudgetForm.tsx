"use client"

import { toast } from "sonner";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { BudgetForm } from "./BudgetForm";
import { createBudget } from "@/actions/create-budget-action";

export function CreateBudgetForm() {

    const router = useRouter()
    const [state, dispatch] = useFormState(createBudget, {
        errors: [],
        fieldErrors: {},
        success: ''
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.back()
        }
    }, [state.success, router])

    useEffect(() => {
        // Solo mostrar toast para errores generales (no de campos)
        if (state.errors.length > 0) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
    }, [state.errors])

    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
           <BudgetForm fieldErrors={state.fieldErrors} />
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 transition-colors duration-300 cursor-pointer"
                value='Crear Presupuesto'
            />
        </form>
    )
}