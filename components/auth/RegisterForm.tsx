"use client"

import { toast } from "sonner";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { ErrorMessage } from "../ui";
import { register } from "@/actions/create-account-action"

export function RegisterForm() {

    const router = useRouter()
    const [state, dispatch] = useFormState(register, {
        errors: [],
        fieldErrors: {},
        success: '',
        warning: ''
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            setTimeout(() => {
                router.push('/auth/login')
            }, 1500)
        }
    }, [state.success, router])

    useEffect(() => {
        if (state.warning) {
            toast.warning(state.warning)
        }
    }, [state.warning])

    return (
        <form
            className="mt-14 space-y-5"
            noValidate
            action={dispatch}
        >
            <div className="flex flex-col gap-2">
                <label
                    className={`font-bold text-2xl ${
                        state.fieldErrors?.email ? 'text-red-600' : ''
                    }`}
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
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

            <div className="flex flex-col gap-2">
                <label
                    className={`font-bold text-2xl ${
                        state.fieldErrors?.name ? 'text-red-600' : ''
                    }`}
                >Nombre</label>
                <input
                    type="name"
                    placeholder="Nombre de Registro"
                    className={`w-full border p-3 rounded-lg ${
                        state.fieldErrors?.name 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-300'
                    }`}
                    name="name"
                />
                {state.fieldErrors?.name && (
                    <ErrorMessage>{state.fieldErrors.name[0]}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className={`font-bold text-2xl ${
                        state.fieldErrors?.password ? 'text-red-600' : ''
                    }`}
                >Password</label>
                <input
                    type="password"
                    placeholder="Password de Registro"
                    className={`w-full border p-3 rounded-lg ${
                        state.fieldErrors?.password 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-300'
                    }`}
                    name="password"
                />
                {state.fieldErrors?.password && (
                    <ErrorMessage>{state.fieldErrors.password[0]}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className={`font-bold text-2xl ${
                        state.fieldErrors?.password_confirmation ? 'text-red-600' : ''
                    }`}
                >Repetir Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className={`w-full border p-3 rounded-lg ${
                        state.fieldErrors?.password_confirmation 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-300'
                    }`}
                    name="password_confirmation"
                />
                {state.fieldErrors?.password_confirmation && (
                    <ErrorMessage>{state.fieldErrors.password_confirmation[0]}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value='Registrarme'
                className="bg-purple-950 hover:bg-purple-800 transition-colors duration-300 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
            />
        </form>
    )
}
