import { ErrorMessage } from "../ui";
import { DraftExpense } from "@/src/schemas";

interface ExpenseFormProps {
    fieldErrors?: {
        name?: string[];
        amount?: string[];
    }
    expense?: DraftExpense
}

export function ExpenseForm({ fieldErrors = {}, expense }: ExpenseFormProps) {
    return (
        <>
            <div className="mb-5">
                <label 
                    htmlFor="name" 
                    className={`text-sm uppercase font-bold ${
                        fieldErrors?.name ? 'text-red-600' : ''
                    }`}
                >
                    Nombre Gasto
                </label>
                <input
                    id="name"
                    className={`w-full p-3 border bg-white ${
                        fieldErrors?.name 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-100'
                    }`}
                    type="text"
                    placeholder="Nombre del Gasto"
                    name="name"
                    defaultValue={expense?.name}
                />
                {fieldErrors?.name && (
                    <ErrorMessage>{fieldErrors.name[0]}</ErrorMessage>
                )}
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="amount" 
                    className={`text-sm uppercase font-bold ${
                        fieldErrors?.amount ? 'text-red-600' : ''
                    }`}
                >
                    Cantidad Gasto
                </label>
                <input
                    id="amount"
                    className={`w-full p-3 border bg-white ${
                        fieldErrors?.amount 
                            ? 'border-red-600 focus:border-red-600 focus:ring-red-600' 
                            : 'border-gray-100'
                    }`}
                    type="number"
                    placeholder="Cantidad del Gasto"
                    name="amount"
                    defaultValue={expense?.amount}
                />
                {fieldErrors?.amount && (
                    <ErrorMessage>{fieldErrors.amount[0]}</ErrorMessage>
                )}
            </div>
        </>
    )
}