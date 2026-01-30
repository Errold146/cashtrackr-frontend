"use client"

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { DialogTitle } from "@headlessui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { deleteBudget } from "@/actions/delete-budget-action";
import { ErrorMessage } from "@/components/ui";

export function ConfirmPasswordForm() {
    
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const budgetId = +searchParams.get('deleteBudgetId')!

    const deleteBudgetPassword = deleteBudget.bind(null, budgetId)
    const [state, dispatch] = useFormState(deleteBudgetPassword, {
        errors: [],
        fieldErrors: {},
        success: ''
    } as const)

    useEffect(() => {
        // Solo mostrar toast para errores generales (no de campos)
        if (state.errors.length > 0) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
    }, [state.errors])

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            router.replace(`${pathname}`)
        }
    }, [state.success, router, pathname])

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString())
        hideModal.delete('deleteBudgetId')
        router.replace(`${pathname}?${hideModal}`)
    }

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Eliminar Presupuesto
            </DialogTitle>
            <p className="text-xl font-bold">Ingresa tu Password para {''}
                <span className="text-amber-500">eliminar el presupuesto </span>
            </p>
            <p className='text-gray-600 text-sm'>(Un presupuesto y sus gastos, despues de eliminados NO se pueden recuperar)</p>
            <form
                className=" mt-14 space-y-5"
                noValidate
                action={dispatch}
            >
                <div className="flex flex-col gap-2">
                    <label
                        className={`font-bold text-2xl ${state.errors.length > 0 ? 'text-red-600' : ''}`}
                        htmlFor="password"
                    >Ingresa tu Password para eliminar</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className={`w-full border p-3 rounded-lg ${state.errors.length > 0 ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-300'}`}
                        name='password'
                    />
                    {state.errors.length > 0 && (
                        <ErrorMessage>{state.errors[0]}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <input
                        type="submit"
                        value='Eliminar Presupuesto'
                        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors duration-300"
                    />
                    <button
                        type="button"
                        className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors duration-300"
                        onClick={closeModal}
                    >Cancelar</button>
                </div>
            </form>
        </>
    )
}