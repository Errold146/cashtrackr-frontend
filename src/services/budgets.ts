import { cache } from "react";
import { notFound } from "next/navigation";

import getToken from "@/src/auth/token";
import { OneBudgetAPIResponseSchema } from "@/src/schemas";

export const getBudget = cache( async (id: string) => {

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${id}`
    
    try {
        const req = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await req.json()
        if ( !req.ok ) {
            notFound()
        }

        const budget = OneBudgetAPIResponseSchema.parse(json)
        return budget
    } catch (error) {
        console.error('Error fetching budget:', error)
        notFound()
    }
})