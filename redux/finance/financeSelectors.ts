import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "@/redux/reduxTypes"

export const selectTotalBills = (state: RootState) => {
  return state.financeSlice.transactions
    .filter((transaction) => transaction.recurring === true)
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0)
    .toFixed(2)
}

const selectRecurringBills = (state: RootState) =>
  state.financeSlice.transactions.filter((transaction) => transaction.recurring)

export const selectFinanceStats = createSelector(
  [selectRecurringBills],
  (recurringBills) => {
    const today = new Date()

    const paidBillsLength = recurringBills.filter(
      (transaction) => new Date(transaction.date) < today,
    )

    const paidBills = paidBillsLength
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)
      .toFixed(2)

    const dueSoonLength = recurringBills.filter((transaction) => {
      const dueDate = new Date(transaction.date)
      const differenceInDays =
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      return differenceInDays > 0 && differenceInDays <= 7
    })

    const dueSoon = dueSoonLength
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)
      .toFixed(2)

    const totalUpcomingLength = recurringBills.filter(
      (transaction) => new Date(transaction.date) >= today,
    )

    const totalUpcoming = totalUpcomingLength
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)
      .toFixed(2)

    return {
      paidBills: {
        amount: paidBills,
        length: paidBillsLength.length,
      },
      dueSoon: {
        amount: dueSoon,
        length: dueSoonLength.length,
      },
      totalUpcoming: {
        amount: totalUpcoming,
        length: totalUpcomingLength.length,
      },
    }
  },
)
