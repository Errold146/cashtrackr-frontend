"use client"

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useFormState } from "react-dom";

import { updatePassword } from "@/actions/update-password-action";
import { ErrorMessage } from "@/components/ui";

type ChangePasswordState = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export function ChangePasswordForm() {

    const [ state, dispatch ] = useFormState(updatePassword, {
        errors: [],
        fieldErrors: {},
        success: ''
    } as const)

    const changePasswordState = state as ChangePasswordState
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        if (changePasswordState.errors.length > 0) {
            changePasswordState.errors.forEach(error => {
                toast.error(error)
            })
        }
    }, [changePasswordState.errors])

    useEffect(() => {
        if (changePasswordState.success) {
            toast.success(changePasswordState.success)
            formRef.current?.reset()
        }
    }, [changePasswordState.success])

    return (
        <>
            <form
                ref={formRef}
                className=" mt-14 space-y-5"
                noValidate
                action={dispatch}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className={`font-bold text-2xl ${
                            changePasswordState.fieldErrors?.current_password ? 'text-red-600' : ''
                        }`}
                        htmlFor="current_password"
                    >Password Actual</label>
                    <input
                        id="current_password"
                        type="password"
                        placeholder="Password Actual"
                        className={`w-full border p-3 rounded-lg ${
                            changePasswordState.fieldErrors?.current_password
                                ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                                : 'border-gray-300'
                        }`}
                        name="current_password"
                    />
                    {changePasswordState.fieldErrors?.current_password && (
                        <ErrorMessage>{changePasswordState.fieldErrors.current_password[0]}</ErrorMessage>
                    )}
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className={`font-bold text-2xl ${
                            changePasswordState.fieldErrors?.password ? 'text-red-600' : ''
                        }`}
                        htmlFor="password"
                    >Nuevo Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className={`w-full border p-3 rounded-lg ${
                            changePasswordState.fieldErrors?.password
                                ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                                : 'border-gray-300'
                        }`}
                        name="password"
                    />
                    {changePasswordState.fieldErrors?.password && (
                        <ErrorMessage>{changePasswordState.fieldErrors.password[0]}</ErrorMessage>
                    )}
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        htmlFor="password_confirmation"
                        className={`font-bold text-2xl ${
                            changePasswordState.fieldErrors?.password_confirmation ? 'text-red-600' : ''
                        }`}
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className={`w-full border p-3 rounded-lg ${
                            changePasswordState.fieldErrors?.password_confirmation
                                ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                                : 'border-gray-300'
                        }`}
                        name="password_confirmation"
                    />
                    {changePasswordState.fieldErrors?.password_confirmation && (
                        <ErrorMessage>{changePasswordState.fieldErrors.password_confirmation[0]}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Cambiar Password'
                    className="bg-purple-950 hover:bg-purple-800 transition-colors duration-300 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}