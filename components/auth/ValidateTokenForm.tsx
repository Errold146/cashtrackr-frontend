"use client"

import { toast } from "sonner";
import { useFormState } from "react-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { validateToken } from "@/actions/validate-token-action";

type Props = {
    setIsValidToken: Dispatch<SetStateAction<boolean>>
    token: string
    setToken: Dispatch<SetStateAction<string>>
}

export function ValidateTokenForm({setIsValidToken, token, setToken}: Props) {

    const [isComplete, setIsComplete] = useState(false)

    const validateTokenInput = validateToken.bind(null, token)
    const [state, dispatch] = useFormState(validateTokenInput, {
        errors: [],
        fieldErrors: {},
        success: ''
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
        if ( state.success ) {
            toast.success(state.success)
            setIsValidToken(true)
        }
    }, [state.success]) // eslint-disable-line react-hooks/exhaustive-deps
    

    useEffect(() => {
        if ( isComplete ) {
            dispatch()
        }
    }, [isComplete]) // eslint-disable-line react-hooks/exhaustive-deps
    

    const handleChange = (token: string) => {
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
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow-md rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow-md rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow-md rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow-md rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow-md rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow-md rounded-lg placeholder-white" />
            </PinInput>
        </div>
    )
}