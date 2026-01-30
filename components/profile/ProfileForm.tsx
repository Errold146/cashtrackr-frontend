"use client"

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useFormState } from "react-dom";

import { updateProfile } from "@/actions/update-profile-action";
import { ErrorMessage } from "@/components/ui";
import { User } from "@/src/schemas";

type UpdateProfileState = {
    errors: string[]
    fieldErrors: Record<string, string[]>
    success: string
}

export function ProfileForm({user}: {user: User}) {

    const [ state, dispatch ] = useFormState(updateProfile, {
        errors: [],
        fieldErrors: {},
        success: ''
    } as const)

    const updateProfileState = state as UpdateProfileState
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        if (updateProfileState.errors.length > 0) {
            updateProfileState.errors.forEach(error => {
                toast.error(error)
            })
        }
    }, [updateProfileState.errors])

    useEffect(() => {
        if (updateProfileState.success) {
            toast.success(updateProfileState.success)
            formRef.current?.reset()
        }
    }, [updateProfileState.success])

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
                            updateProfileState.fieldErrors?.name ? 'text-red-600' : ''
                        }`}
                    >Nombre</label>
                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        defaultValue={user.name}
                        className={`w-full border p-3 rounded-lg ${
                            updateProfileState.fieldErrors?.name
                                ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                                : 'border-gray-300'
                        }`}
                        name="name"
                    />
                    {updateProfileState.fieldErrors?.name && (
                        <ErrorMessage>{updateProfileState.fieldErrors.name[0]}</ErrorMessage>
                    )}
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className={`font-bold text-2xl ${
                            updateProfileState.fieldErrors?.email ? 'text-red-600' : ''
                        }`}
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email"
                        defaultValue={user.email}
                        className={`w-full border p-3 rounded-lg ${
                            updateProfileState.fieldErrors?.email
                                ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
                                : 'border-gray-300'
                        }`}
                        name="email"
                    />
                    {updateProfileState.fieldErrors?.email && (
                        <ErrorMessage>{updateProfileState.fieldErrors.email[0]}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Actualizar Perfil'
                    className="bg-purple-950 hover:bg-purple-800 transition-colors duration-300 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}