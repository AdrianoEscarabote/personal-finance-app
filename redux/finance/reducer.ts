import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  initialStateType,
  NewBudgetPayload,
  NewPotPayload,
} from "../reduxTypes"

const initialState: initialStateType = {
  balance: {
    current: 0,
    income: 0,
    expenses: 0,
  },
  transactions: [],
  budgets: [],
  pots: [],
}
const financeSlice = createSlice({
  name: "financeSlice",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<initialStateType>) => {
      state.balance = action.payload.balance
      state.transactions = action.payload.transactions
      state.budgets = action.payload.budgets
      state.pots = action.payload.pots
    },
    addNewPot: (state, action: PayloadAction<NewPotPayload>) => {
      const { name, target, theme, total, pot_id } = action.payload
      state.pots.push({ name, target, theme, total, pot_id })
    },
    editPot: (
      state,
      action: PayloadAction<{
        pot_name: string
        new_pot_name: string
        maximum_spend: number
        theme: string
      }>,
    ) => {
      const { pot_name, new_pot_name, maximum_spend, theme } = action.payload

      const pot = state.pots.find((pot) => pot.name === pot_name)
      if (!pot) return

      state.pots = state.pots.map((pot) => {
        if (pot.name === pot_name) {
          pot.name = new_pot_name
          pot.target = maximum_spend
          pot.theme = theme
        }
        return pot
      })
    },
    deletePot: (state, action: PayloadAction<{ pot_id: string }>) => {
      const { pot_id } = action.payload
      if (!pot_id) return
      state.pots = state.pots.filter((pot) => pot.pot_id !== pot_id)
    },
    addBudget: (state, action: PayloadAction<NewBudgetPayload>) => {
      const { category, maximum, theme, budget_id } = action.payload

      state.budgets.push({ category, maximum, theme, budget_id })
    },
    editBudget: (
      state,
      action: PayloadAction<{
        category: string
        new_category: string
        maximum: number
        theme: string
      }>,
    ) => {
      const { category, maximum, new_category, theme } = action.payload
      state.budgets = state.budgets.map((budget) => {
        if (budget.category === category) {
          budget.category = new_category
          budget.maximum = maximum
          budget.theme = theme
        }
        return budget
      })
    },
    deleteBudget: (state, action: PayloadAction<{ bugdet_id: string }>) => {
      const { bugdet_id } = action.payload

      if (!bugdet_id) return
      state.budgets = state.budgets.filter(
        (budget) => budget.budget_id !== bugdet_id,
      )
    },
    addMoney: (
      state,
      action: PayloadAction<{ pot_name: string; new_amount: number }>,
    ) => {
      const { pot_name, new_amount } = action.payload
      const pot = state.pots.find((pot) => pot.name === pot_name)
      if (!pot) return
      pot.total += new_amount
    },
    withdrawMoney: (
      state,
      action: PayloadAction<{ pot_name: string; withdraw_amount: number }>,
    ) => {
      const { pot_name, withdraw_amount } = action.payload
      const pot = state.pots.find((pot) => pot.name === pot_name)
      if (!pot) return
      pot.total -= withdraw_amount
    },
    addTransaction: (
      state,
      action: PayloadAction<{
        name: string
        date: string
        category: string
        amount: number
        recurring: boolean
        avatar: string
      }>,
    ) => {
      const { name, date, amount, recurring, category, avatar } = action.payload

      if (!name || !date || !amount || !category || !avatar) return

      state.transactions.push({
        name,
        date,
        amount,
        recurring,
        category,
        avatar,
      })
    },
  },
})

export default financeSlice.reducer

export const {
  setData,
  addNewPot,
  editPot,
  deletePot,
  addBudget,
  editBudget,
  deleteBudget,
  addMoney,
  withdrawMoney,
  addTransaction,
} = financeSlice.actions
