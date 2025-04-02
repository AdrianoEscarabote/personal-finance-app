"use client"

import { useSelector } from "react-redux"

import { RootState } from "@/redux/reduxTypes"

import BudgetPieChart from "../budgetPieChart"

const BudgetsSpendingSummary = () => {
  const { budgets = [], transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )

  if (!budgets.length || !transactions.length) {
    return null
  }

  return (
    <div className="w-full lg:max-w-[26.75rem]">
      <article className="w-full rounded-xl bg-white p-8 px-5 md:py-6 lg:max-w-[26.75rem]">
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-col">
          <BudgetPieChart width={296} height={280} />

          <ul className="mt-4 w-full">
            <h3 className="text-preset-2 mb-6 text-grey-900">
              Spending Summary
            </h3>
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
