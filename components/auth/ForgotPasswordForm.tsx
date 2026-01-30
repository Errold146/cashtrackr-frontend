"use client"

import { toast } from "sonner";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { forgotPassword } from "@/actions/forgot-password-action";
import { ErrorMessage } from "../ui";

export function ForgotPasswordForm() {

    const [state, dispatch] = useFormState(forgotPassword, {
        errors: [],
        fieldErrors: {},
        success: '',
    })

    useEffect(() => {
        // Solo mostrar toast para errores generales (no de campos)
        if (state.errors.length > 0) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
    }, [state.errors])

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
        }
    }, [state.success])
    

    return (
        <form 
            action={dispatch}
            className=" mt-14 space-y-5"
            noValidate
        >
            <div className="flex flex-col gap-2 mb-10">
                <label
                    className={`font-bold text-2xl ${
                        state.fieldErrors?.email ? 'text-red-600' : ''
                    }`}
                >Email</label>
        
                <input
                    type="email"
                    placeholder="Email de Registro"
                    className={`w-full border p-3 rounded-lg ${
                        state.fieldErrors?.email 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-300'
                    }`}
                    name="email"
                />
                {state.fieldErrors?.email && (
                    <ErrorMessage>{state.fieldErrors.email[0]}</ErrorMessage>
                )}
            </div>
        
            <input 
                type="submit"
                value='Enviar Instrucciones'
                className="bg-purple-950 hover:bg-purple-800 transition-colors duration-300 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
            />
        </form>
    )
}