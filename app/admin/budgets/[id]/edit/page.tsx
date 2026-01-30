import Link from "next/link";
import { Metadata } from "next";

import { getBudget } from "@/src/services/budgets";
import { EditBudgetForm } from "@/components/budgets";

export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
    const budget = await getBudget(params.id)
    return {
        title: `CashTrackr - ${budget.name}`,
        description: `Update Budget - ${budget.name}`,
        keywords: "budget tracking, expense management, financial planning, register account, personal finance"
    }
}

export default async function EditBudgetPage({params}: {params: {id: string}}) {
    const { id } = params
    const budget = await getBudget(id)

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className='font-bold text-4xl text-purple-950 my-5'>
                        Editar Presupuesto: <span className="font-black text-amber-500">{budget.name}</span>
                    </h1>
                    <p className="text-xl font-bold">Llena el formulario y edita el {''}
                        <span className="text-amber-500">presupuesto</span>
                    </p>
                </div>
                <Link
                    href={'/admin'}
                    className='bg-amber-500 hover:bg-amber-600 transition-colors duration-300 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Volver
                </Link>
            </div>
            <div className='p-10 mt-10  shadow-lg border '>
                <EditBudgetForm budget={budget} />
            </div>
        </>
    )
}
