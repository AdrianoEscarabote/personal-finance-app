import { useSelector } from "react-redux"

import { RootState } from "@/redux/reduxTypes"

import BudgetPieChart from "../budgetPieChart"
import Button from "../button"

const Budgets = () => {
  const { budgets } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  return (
    <article>
      <div className="w-full rounded-xl bg-white px-5 py-6 md:max-w-[26.75rem] md:p-8">
        <div className="mb-5 flex w-full items-center justify-between">
          <h3 className="text-preset-2 text-grey-900">Budgets</h3>
          <Button
            variant="tertiary"
            style={{ maxWidth: "6.125rem", maxHeight: "1.3125rem" }}
            showIcon
            href="/budgets"
            label="See Details"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-4 md:flex-row">
          <BudgetPieChart width={247} height={240} />
          <ul className="mt-4 grid w-full grid-cols-2 flex-col gap-x-4 md:flex md:w-auto md:gap-x-0">
            {budgets.map((budget, index, arr) => (
              <li
                key={budget.category}
                className={`flex w-full items-center gap-3 ${
                  index === arr.length - 1
                    ? "pb-0 pt-3"
                    : "border-grey-100 py-3 md:border-b"
                }`}
              >
                <div
                  className="h-[43px] w-1 rounded-lg"
                  style={{ backgroundColor: budget.theme }}
                ></div>

                <div className="flex w-full flex-col items-start justify-between gap-1 pl-4">
                  <p className="text-preset-5 text-grey-500">
                    {budget.category}
                  </p>
                  <p className="text-preset-4-bold text-grey-900">
                    ${budget.maximum.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default Budgets
