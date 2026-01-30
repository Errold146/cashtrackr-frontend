"use client"

import { toast } from "sonner";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";

import { confirmAccount } from "@/actions/confirm-account-action";

export function ConfirmAccountForm() {

    const router = useRouter()
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")

    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        fieldErrors: {},
        success: ""
    }) 

    useEffect(() => {
        if ( isComplete ) {
            dispatch()
            setIsComplete(false)
        }
    }, [isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            setTimeout(() => {
                router.push('/auth/login')
            }, 1500)
        }
    }, [state.success, router])

    useEffect(() => {
        // Solo mostrar toast para errores generales (no de campos)
        if (state.errors.length > 0) {
            state.errors.forEach(error => {
                toast.error(error)
            })
            setToken("")
        }
    }, [state.errors])

    const handleChange= (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

    return (
        <div className="flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 border border-gray-300 shadow-md rounded-lg text-center placeholder-white" />
                <PinInputField className="h-10 w-10 border border-gray-300 shadow-md rounded-lg text-center placeholder-white" />
                <PinInputField className="h-10 w-10 border border-gray-300 shadow-md rounded-lg text-center placeholder-white" />
                <PinInputField className="h-10 w-10 border border-gray-300 shadow-md rounded-lg text-center placeholder-white" />
                <PinInputField className="h-10 w-10 border border-gray-300 shadow-md rounded-lg text-center placeholder-white" />
                <PinInputField className="h-10 w-10 border border-gray-300 shadow-md rounded-lg text-center placeholder-white" />
            </PinInput>
        </div>
    )
}
