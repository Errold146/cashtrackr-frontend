import { Budget } from "@/src/schemas";
import { ErrorMessage } from "../ui";

interface BudgetFormProps {
    budget?: Budget;
    fieldErrors?: {
        name?: string[];
        amount?: string[];
    };
}

export function BudgetForm({budget, fieldErrors = {}}: BudgetFormProps) {
    return (
        <>
            <div className="space-y-3">
                <label 
                    htmlFor="name" 
                    className={`text-sm uppercase font-bold ${
                        fieldErrors?.name ? 'text-red-600' : ''
                    }`}
                >
                    Nombre Presupuesto
                </label>
                <input
                    id="name"
                    className={`w-full p-3 border bg-slate-100 ${
                        fieldErrors?.name 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-100'
                    }`}
                    type="text"
                    placeholder="Nombre del Presupuesto"
                    name="name"
                    defaultValue={budget?.name}
                />
                {fieldErrors?.name && (
                    <ErrorMessage>{fieldErrors.name[0]}</ErrorMessage>
                )}
            </div>
            <div className="space-y-3">
                <label 
                    htmlFor="amount" 
                    className={`text-sm uppercase font-bold ${
                        fieldErrors?.amount ? 'text-red-600' : ''
                    }`}
                >
                    Cantidad Presupuesto
                </label>
                <input
                    type="number"
                    id="amount"
                    className={`w-full p-3 border bg-slate-100 ${
                        fieldErrors?.amount 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-100'
                    }`}
                    placeholder="Cantidad Presupuesto"
                    name="amount"
                    defaultValue={budget?.amount}
                />
                {fieldErrors?.amount && (
                    <ErrorMessage>{fieldErrors.amount[0]}</ErrorMessage>
                )}
            </div>   
        </>
    )
}
