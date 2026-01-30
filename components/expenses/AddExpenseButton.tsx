"use client"

import { useRouter } from "next/navigation";

export function AddExpenseButton() {

    const router = useRouter()

    return (
        <button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 transition-colors duration-300 cursor-pointer text-white px-10 py-2 rounded-lg font-bold"
            onClick={() => router.push('?addExpense=true&showModal=true')}
        >
            Agregar Gasto
        </button>
    )
}
