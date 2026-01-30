"use client"

import { toast } from "sonner";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { DialogTitle } from "@headlessui/react";
import { useParams, useSearchParams } from "next/navigation";

import { ExpenseForm } from "./ExpenseForm";
import { DraftExpense } from "@/src/schemas";
import { editExpense } from "@/actions/edit-expense-action";

export function EditExpenseForm({ closeModal }: { closeModal: () => void }) {

    const [expense, setExpense] = useState<DraftExpense>()
    const {id: budgetId} = useParams()
    const searchParams = useSearchParams()
    const expenseId = searchParams.get('editExpenseId')!

    const editExpenseWithBudgetId = editExpense.bind(null, { 
        budgetId: +budgetId, 
        expenseId: +expenseId 
    })
    const [ state, dispatch ] = useFormState(editExpenseWithBudgetId, {
        errors: {},
        success: ''
    })

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error al cargar el gasto')
                }
                return res.json()
            })
            .then(data => setExpense(data))
            .catch(error => {
                console.error('Error:', error)
                toast.error('Error al cargar el gasto')
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        if (state.errors.message) {
            toast.error(state.errors.message[0])
        }
    }, [state.errors.message]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            closeModal()
        }
    }, [state.success]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const fieldErrors = state.errors

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Editar el gasto: {expense?.name}
            </DialogTitle>
            <p className="text-xl font-bold">Edita los detalles del {''}
                <span className="text-amber-500">gasto</span>
            </p>
            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={dispatch}
            >
                <ExpenseForm expense={expense} fieldErrors={fieldErrors} />

                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors duration-300"
                    value='Guardar Cambios'
                />
            </form>
        </>
    )
}
