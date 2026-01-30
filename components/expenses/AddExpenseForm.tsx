"use client"

import { toast } from "sonner";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";

import { ExpenseForm } from "./ExpenseForm";
import { createExpense } from "@/actions/create-expense-action";

export function AddExpenseForm({closeModal}: {closeModal: () => void}) {

    const { id } = useParams()
    const createExpenseWithBudgetId = createExpense.bind(null, +id)
    const [state, dispatch] = useFormState(createExpenseWithBudgetId, {
        errors: [],
        fieldErrors: {},
        success: ''
    })

    useEffect(() => {
        if (state.errors.length > 0) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
    }, [state.errors])

    useEffect(() => {
        if ( state.success ) {
            toast.success(state.success)
            closeModal()
        }
    }, [state.success]) // eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Agregar Gasto
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-amber-500">gasto</span>
            </p>
            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={dispatch}
            >
                <ExpenseForm fieldErrors={state.fieldErrors} />
                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors duration-300"
                    value='Registrar Gasto'
                />
            </form>
        </>
    )
}