import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: "Tu Email es requerido." }).email({ message: "Email inválido." }),
    name: z.string().min(1, { message: "Tu Nombre es requerido." }),
    password: z.string().min(8, { message: "El Password es requerido, mínimo 8 caracteres." }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Password's no son iguales.",
    path: ['password_confirmation']
})

export const LoginSchema = z.object({
    email: z.string().min(1, {message: 'El Email es requerido.'}).email( {message: 'Email Inválido.'}),
    password: z.string().min(1, {message: 'El Password es requerido.'})
})

export const ForgotPasswordSchema = z.object({
    email: z.string().min(1, {message: 'El Email es Requerido.'}).email( {message: 'Email Inválido.'}),
})

export const TokenSchema = z.string({ message: "Token Inválido." }).length(6, { message: "Token Inválido." })

export const ResetPasswordSchema = z.object({
    password: z.string().min(8, {message: 'El Password es requerido. Mínimo 8 caracteres.'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Password's no son iguales.",
    path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
    name: z.string().min(1, {message: 'El Nombre del presupuesto es requerido.'}),
    amount: z.coerce.number({message: 'Cantidad Inválida.'}).min(1, {message: 'Cantidad Inválida.'}),
})

export const DraftExpenseSchema = z.object({
    name: z.string().min(1, {message: 'El Nombre del gasto es requerido.'}),
    amount: z.coerce.number({message: 'Cantidad Inválida.'}).min(1, {message: 'Cantidad Inválida.'}),
})

export const PasswordValidationSchema = z.string().min(1, { message: "El password es requerido."})

export const UpdatePasswordSchema = z.object({
    current_password: z.string().min(1, { message: "El password actual es requerido."}),
    password: z.string().min(8, { message: "El nuevo password debe ser mínimo de 8 caracteres."}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los password's no son iguales.",
    path: ["password_confirmation"]
})
export const UpdateProfileSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido." }),
    email: z.string().min(1, { message: "El email es requerido." }).email({ message: "Email inválido." })
})
export const SuccessSchema = z.string()

export const ErrorMessageSchema = z.object({
    error: z.string()
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export const ExpenseAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    budgetId: z.number()
})

export const OneBudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    expenses: z.array(ExpenseAPIResponseSchema)
})

export const BudgetsAPIResponseSchema = z.array(
    OneBudgetAPIResponseSchema.omit({expenses: true})
).catch([])

export type User = z.infer<typeof UserSchema>
export type Budget = z.infer<typeof OneBudgetAPIResponseSchema>
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>
export type DraftExpense = z.infer<typeof DraftExpenseSchema>