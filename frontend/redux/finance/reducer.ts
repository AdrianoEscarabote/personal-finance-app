import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import updateBalance from "@/utils/updateBalance"

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
    clearData: (state) => {
      state.balance = {
        current: 0,
        income: 0,
        expenses: 0,
      }
      state.transactions = []
      state.budgets = []
      state.pots = []
    },
    addNewPot: (state, action: PayloadAction<NewPotPayload>) => {
      const { name, target, theme, total, id } = action.payload
      state.pots.push({ name, target, theme, total, id })
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
    deletePot: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      if (!id) return
      state.pots = state.pots.filter((pot) => pot.id !== id)
    },
    addBudget: (state, action: PayloadAction<NewBudgetPayload>) => {
      const { category, maximum, theme, id } = action.payload

      state.budgets.push({ category, maximum, theme, id })
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
    deleteBudget: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      if (!id) return
      state.budgets = state.budgets.filter((budget) => budget.id !== id)
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

      if (
        !name ||
        !date ||
        amount === undefined ||
        amount === null ||
        !category ||
        !avatar
      )
        return

      const budget = state.budgets.find((b) => b.category === category)
      if (budget) {
        const totalFromCategory = state.transactions
          .filter((t) => t.category === category && t.amount < 0)
          .reduce((acc, t) => acc + Math.abs(t.amount), 0)
        const newTotal = totalFromCategory + Math.abs(amount)
        if (newTotal > budget.maximum) {
          budget.maximum = newTotal
        }
      }

      state.transactions.push({
        name,
        date,
        amount,
        recurring,
        category,
        avatar,
      })

      updateBalance(state)
    },
  },
})

export default financeSlice.reducer

export const {
  setData,
  clearData,
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
