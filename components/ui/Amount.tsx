import { formatCurrency } from "@/src/utils"

interface Props {
    label: string
    amount: number
}

export function Amount({label, amount}: Props) {
    return (
        <p className="text-xl font-bold">
            {label}: {' '}
            <span className="text-amber-500">{formatCurrency(amount)}</span>
        </p>
    )
}
