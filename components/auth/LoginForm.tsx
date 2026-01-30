"use client"

import { authenticate } from "@/actions/auth-user-action"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { ErrorMessage } from "../ui"

type LoginState = {
    errors: string[]
    fieldErrors: Record<string, string[]>
}

export function LoginForm() {

    const [state, dispatch] = useFormState(authenticate, {
        errors: [],
        fieldErrors: {}
    } as const)

    const loginState = state as LoginState

    useEffect(() => {
        // Solo mostrar toast para errores generales (no de campos)
        if ( loginState.errors.length > 0 ) {
            loginState.errors.forEach(error => {
                toast.error(error)
            })
        }
    }, [loginState.errors])
    

    return (
        <>
            <form
                action={dispatch}
                className="mt-14 space-y-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className={`font-bold text-2xl ${loginState.fieldErrors?.email ? 'text-red-600' : ''}`}
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className={`w-full border p-3 rounded-lg ${loginState.fieldErrors?.email ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-300'}`}
                        name="email"
                    />
                    {loginState.fieldErrors?.email && (
                        <ErrorMessage>{loginState.fieldErrors.email[0]}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className={`font-bold text-2xl ${loginState.fieldErrors?.password ? 'text-red-600' : ''}`}
                    >Password</label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className={`w-full border p-3 rounded-lg ${loginState.fieldErrors?.password ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : 'border-gray-300'}`}
                        name="password"
                    />
                    {loginState.fieldErrors?.password && (
                        <ErrorMessage>{loginState.fieldErrors.password[0]}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-purple-950 hover:bg-purple-800 transition-colors duration-300 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}