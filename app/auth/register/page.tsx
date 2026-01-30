import Link from "next/link";
import { Metadata } from "next";

import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Cashtrackr - Register",
    description: "Create an account to start managing your budgets and expenses",
    keywords: "budget tracking, expense management, financial planning, register account, personal finance"
}

export default function RegisterPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>  
            <p className="text-3xl font-bold">Y controla tus <span className="text-amber-500">finanzas</span></p> 

            <RegisterForm />

            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    href={"/auth/login"}
                    className="hover:underline text-amber-500 text-center"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
                
                <Link 
                    href={"/auth/forgot-password"}
                    className="hover:underline text-amber-500 text-center"
                >
                    ¿Olvide mi contraseña? Restablecer Password
                </Link>
            </nav>
        </>
    )
}
