/* import { Finance } from "@prisma/client" */

// Simulação manual do tipo Finance
export interface Finance {
  id: string
  userId: string
  balance?: Balance
  transactions?: Transactions[]
  budgets?: Budgets[]
  pots?: Pots[]
}

export interface Balance {
  id: string
  financeId: string
  current: number
  income: number
  expenses: number
}

export interface Transactions {
  id: string
  financeId: string
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

export interface Budgets {
  id: string
  financeId: string
  category: string
  maximum: number
  theme: string
}

export interface Pots {
  id: string
  financeId: string
  name: string
  target: number
  total: number
  theme: string
}

export interface UserTypes {
  email: string
  password: string
  id: string
  finance?: Finance
}
