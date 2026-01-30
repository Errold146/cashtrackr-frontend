import Link from "next/link"
import { Metadata } from "next";
import { FaceFrownIcon } from "@heroicons/react/24/outline"

export const metadata: Metadata = {
	title: "CashTrackr - No Encontrado",
	description: "Budget and/our Expense not found",
};

export default function NotFound() {

    return (
        <section className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-amber-50" />

            <div className="flex flex-col items-center justify-center text-center gap-5 p-8 rounded-2xl bg-white/70 backdrop-blur-sm ring-1 ring-gray-900/10">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <FaceFrownIcon className="h-10 w-10" aria-hidden="true" />
                </span>

                <h1 className="font-black text-4xl text-purple-950">Presupuesto no encontrado</h1>
                <p className="text-lg text-gray-700 max-w-prose">
                    El presupuesto que intentas acceder no existe o pudo haber sido movido.
                </p>

                <Link
                    href="/admin"
                    className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 transition-colors duration-300 px-6 py-2 rounded-lg text-white font-bold"
                >
                    Ir a Presupuestos
                </Link>
            </div>
        </section>
    )
}