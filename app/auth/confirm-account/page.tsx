import type { Metadata } from "next";
import { ConfirmAccountForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Cashtrackr - Confirm Account",
    description: "Enter your code and confirm your account",
    keywords: "budget tracking, expense management, financial planning, register account, personal finance"
}

export default function ConfirmAccountPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Confirma tu cuenta</h1>  
            <p className="text-3xl font-bold">Ingresa el codigo que recibiste <span className="text-amber-500">por email</span></p>    

            <ConfirmAccountForm />
        </>
    )
}
