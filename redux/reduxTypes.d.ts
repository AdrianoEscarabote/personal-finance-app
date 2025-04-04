export interface RootState {
  financeSlice: initialStateType
  demoMode: boolean
}

export interface initialStateType {
  balance: balance
  transactions: transactions[]
  budgets: budgets[]
  pots: pots[]
}

interface balance {
  current: number
  income: number
  expenses: number
}

export interface transactions {
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

export interface budgets {
  id: string
  category: string
  maximum: number
  theme: string
}

export interface pots {
  id: string
  name: string
  target: number
  total: number
  theme: string
}

export interface NewPotPayload {
  id: string
  name: string
  target: number
  total: number
  theme: string
}

export interface NewBudgetPayload {
  id: string
  category: string
  maximum: number
  theme: string
}
