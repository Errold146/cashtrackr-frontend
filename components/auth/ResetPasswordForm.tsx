"use client"

import { toast } from "sonner";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { resetPassword } from "@/actions/reset-password-action";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "../ui";

type ResetPasswordState = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export function ResetPasswordForm({token}: {token: string}) {

    const router = useRouter()
    const resetPasswordToken = resetPassword.bind(null, token)
    const [state, dispatch] = useFormState(resetPasswordToken, {
        errors: [],
        fieldErrors: {},
        success: ''
    } as const)

    const resetState = state as ResetPasswordState

    useEffect(() => {
        // Solo mostrar toast para errores generales (no de campos)
        if (resetState.errors.length > 0) {
            resetState.errors.forEach(err => {
                toast.error(err)
            })
        }
    }, [resetState.errors])
    
    useEffect(() => {
        if ( resetState.success ) {
            toast.success(resetState.success)
            router.push('/auth/login')
        }
    }, [resetState.success]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
        <form
            className=" mt-14 space-y-5"
            noValidate
            action={dispatch}
        >
            <div className="flex flex-col gap-5">
                <label
                    className={`font-bold text-2xl ${
                        resetState.fieldErrors?.password ? 'text-red-600' : ''
                    }`}
                >Password</label>

                <input
                    type="password"
                    placeholder="Password de Registro"
                    className={`w-full border p-3 rounded-lg ${
                        resetState.fieldErrors?.password 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-300'
                    }`}
                    name="password"
                />
                {resetState.fieldErrors?.password && (
                    <ErrorMessage>{resetState.fieldErrors.password[0]}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className={`font-bold text-2xl ${
                        resetState.fieldErrors?.password_confirmation ? 'text-red-600' : ''
                    }`}
                >Repetir Password</label>

                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className={`w-full border p-3 rounded-lg ${
                        resetState.fieldErrors?.password_confirmation 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-300'
                    }`}
                    name="password_confirmation"
                />
                {resetState.fieldErrors?.password_confirmation && (
                    <ErrorMessage>{resetState.fieldErrors.password_confirmation[0]}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value='Guardar Password'
                className="bg-purple-950 hover:bg-purple-800 transition-colors duration-300 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
            />
        </form>
    )
}