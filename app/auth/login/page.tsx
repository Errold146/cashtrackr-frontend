import Link from "next/link";
import { Metadata } from "next";

import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
    title: "Cashtrackr - Login",
    description: "Log in, and start managing your budgets and expenses",
    keywords: "budget tracking, expense management, financial planning, register account, personal finance"
}

export default function LoginPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Inicia Sesión</h1>  
            <p className="text-3xl font-bold">Y controla tus <span className="text-amber-500">finanzas</span></p> 

            <LoginForm />

            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    href={"/auth/register"}
                    className="hover:underline text-amber-500 text-center"
                >
                    ¿No tienes cuenta? Crear Cuenta
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
