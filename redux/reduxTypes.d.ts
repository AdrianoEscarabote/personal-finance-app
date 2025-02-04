export interface RootState {
  financeSlice: initialStateType
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
  category: string
  maximum: number
  theme: string
}

export interface pots {
  name: string
  target: number
  total: number
  theme: string
}
