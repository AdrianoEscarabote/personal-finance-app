import { initialStateType } from "@/redux/reduxTypes"

const updateBalance = (state: initialStateType) => {
  const income = state.transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0)

  const expenses = state.transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0)

  state.balance.income = income
  state.balance.expenses = expenses
  state.balance.current = income - expenses
}

export default updateBalance
