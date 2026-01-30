import type { Metadata } from "next";
import { ChangePasswordForm } from "@/components/profile";

export const metadata: Metadata = {
    title: "Cashtrackr - Cambiar Password",
    description: "Cambia tu contraseña de acceso a Cashtrackr de forma segura",
    keywords: "cambiar password, seguridad, contraseña"
}

export default async function ChangePasswordPage() {
    return (
        <>
            <h1 className="font-black text-4xl text-purple-950 my-5">Cambiar Password</h1>
            <p className="text-xl font-bold">Aquí puedes cambiar tu {''}
                <span className="text-amber-500">password</span>
            </p>

            <ChangePasswordForm />
        </>
    )
}
