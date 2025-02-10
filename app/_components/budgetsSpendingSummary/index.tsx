"use client"

import { RootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import BudgetPieChart from "../budgetPieChart"

const BudgetsSpendingSummary = () => {
  const { budgets, transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )

  if (!budgets.length || !transactions.length) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <article className="w-full max-w-[26.75rem] rounded-xl bg-white p-8">
        <div>
          <h3 className="text-preset-2 mb-6 text-grey-900">Budgets</h3>

          <BudgetPieChart width={296} height={280} />

          <ul className="mt-4">
            {budgets.map((budget, index, arr) => {
              const totalSpent = transactions
                .filter(
                  (transaction) => transaction.category === budget.category,
                )
                .reduce((acc, curr) => acc + Math.abs(curr.amount), 0)

              return (
                <li
                  key={budget.category}
                  className={`flex items-center gap-3 ${
                    index === arr.length - 1
                      ? "pb-0 pt-3"
                      : "border-b border-grey-100 py-3"
                  }`}
                >
                  <div
                    className="h-[1.3125rem] w-1 rounded-lg"
                    style={{ backgroundColor: budget.theme }}
                  ></div>

                  <div className="flex w-full items-center justify-between pl-4">
                    <p className="text-preset-4 text-grey-500">
                      {budget.category}
                    </p>
                    <div>
                      <p className="text-preset-3 flex items-center gap-2 text-grey-900">
                        ${totalSpent}
                        <span className="text-preset-5 text-grey-500">
                          {" "}
                          of {budget.maximum}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </article>
    </div>
  )
}

export default BudgetsSpendingSummary
