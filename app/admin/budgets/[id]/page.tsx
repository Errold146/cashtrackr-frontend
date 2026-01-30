import Link from "next/link";
import { Metadata } from "next";

import { getBudget } from "@/src/services/budgets";
import { ProgressBar } from "@/components/budgets";
import { formatCurrency, formatDate } from "@/src/utils";
import { Amount, ModalContainer } from "@/components/ui";
import { AddExpenseButton, ExpenseMenu } from "@/components/expenses";

export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
    const budget = await getBudget(params.id)
    return {
        title: `CashTrackr - ${budget.name}`,
        description: `Admin Budget - ${budget.name}`,
        keywords: "budget tracking, expense management, financial planning, register account, personal finance"
    }
}

export default async function BudgetsDetailsPage({params}: {params: {id: string}}) {

    const budget = await getBudget(params.id)

    const totalSpent = budget.expenses.reduce((total, expense) => +expense.amount + total, 0)
    const available = +budget.amount - totalSpent
    const percentage = Math.ceil((totalSpent / +budget.amount) * 100)

    return (
        <>
            <div className='flex justify-between items-center mb-5 gap-3'>
                <div>
                    <h1 className="font-black text-5xl text-purple-950">{budget.name}</h1>
                    <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
                </div>
                <div className="flex items-center gap-3">
                    <Link 
                        href="/admin"
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 cursor-pointer text-white px-6 py-2 rounded-lg font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Volver a Presupuestos
                    </Link>
                    <AddExpenseButton />
                </div>
            </div>

            {budget.expenses?.length ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                        <div>
                            <ProgressBar percentage={percentage} />
                        </div>
                        <div className="flex flex-col justify-center items-center md:items-start gap-5">
                            <Amount label="Presupuesto" amount={+budget.amount} />
                            <Amount label="Gastado" amount={totalSpent} />
                            <Amount label="Disponible" amount={available} />
                        </div>
                    </div>

                    <h1 className="font-bold text-3xl text-purple-950 mt-10">
                        Gastos del presupuesto
                    </h1>

                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
                        {budget.expenses.map((expense) => (
                            <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {expense.name}
                                        </p>
                                        <p className="text-xl font-bold text-amber-500">
                                            {formatCurrency(+expense.amount)}
                                        </p>
                                        <p className='text-gray-500 text-sm'>
                                            Última actualización: {' '}
                                            <span className="font-bold">{formatDate(expense.updatedAt)}</span>
                                        </p>
                                    </div>
                                </div>
                                <ExpenseMenu expenseId={expense.id} />
                            </li>
                        ))}
                    </ul>
                </>
            ): (
                <div className="text-center py-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto text-gray-300 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        No hay gastos registrados
                    </h3>
                    <p className="text-gray-500 text-lg mb-6">
                        Comienza agregando tu primer gasto para llevar el control de tu presupuesto
                    </p>
                </div>
            )}

            <ModalContainer />
        </>
    )
}
