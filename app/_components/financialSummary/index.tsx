import { useSelector } from "react-redux"

import { RootState } from "@/redux/reduxTypes"
import { formatNumber } from "@/utils/formatNumber"

const FinancialSummary = () => {
  const { current, expenses, income } = useSelector(
    (rootState: RootState) => rootState.financeSlice.balance,
  )

  return (
    <article className="mx-auto flex w-full max-w-[69.375rem] flex-col items-center gap-6 md:flex-row">
      <div className="w-full md:max-w-[21.0625rem]">
        <div className="flex w-full flex-col gap-3 rounded-xl bg-grey-900 p-6 text-white md:max-w-[21.0625rem]">
          <h3 className="text-preset-4">Current Balance</h3>
          <p className="text-preset-1">${formatNumber(current)}</p>
        </div>
      </div>
      <div className="w-full md:max-w-[21.0625rem]">
        <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-6 md:max-w-[21.0625rem]">
          <h3 className="text-preset-4 text-grey-500">Income</h3>
          <p className="text-preset-1 text-grey-900">${formatNumber(income)}</p>
        </div>
      </div>
      <div className="w-full md:max-w-[21.0625rem]">
        <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-6 md:max-w-[21.0625rem]">
          <h3 className="text-preset-4 text-grey-500">Expenses</h3>
          <p className="text-preset-1 text-grey-900">
            ${formatNumber(expenses)}
          </p>
        </div>
      </div>
    </article>
  )
}

export default FinancialSummary
