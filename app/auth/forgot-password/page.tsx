import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cashtrackr - Reset password",
    description: "Reset password, and start managing your budgets and expenses",
    keywords: "budget tracking, expense management, financial planning, register account, personal finance"
}

export default function ForgotPasswordPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu Contraseña?</h1>  
            <p className="text-3xl font-bold">Aquí puedes restablecer tu <span className="text-amber-500">contraseña</span></p> 

            <ForgotPasswordForm />

            <nav className="mt-10 flex flex-col space-y-4">
                <Link 
                    href={"/auth/login"}
                    className="hover:underline text-amber-500 text-center"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
                
                <Link 
                    href={"/auth/register"}
                    className="hover:underline text-amber-500 text-center"
                >
                    ¿No tienes cuenta? Crear Cuenta
                </Link>
            </nav>
        </>
    )
}
