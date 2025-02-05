import { RootState } from "@/redux/reduxTypes"

export const selectTotalBills = (state: RootState) => {
  return state.financeSlice.transactions
    .filter((transaction) => transaction.recurring === true)
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0)
    .toFixed(2)
}
