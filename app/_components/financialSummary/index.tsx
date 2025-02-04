import { RootState } from "@/redux/reduxTypes"
import { formatNumber } from "@/utils/formatNumber"
import { useSelector } from "react-redux"

const FinancialSummary = () => {
  const { current, expenses, income } = useSelector(
    (rootState: RootState) => rootState.financeSlice.balance,
  )

  return (
    <article className="flex w-full items-center gap-6">
      <div className="w-full max-w-[21.0625rem]">
        <div className="flex w-full max-w-[21.0625rem] flex-col gap-3 rounded-xl bg-grey-900 p-6 text-white">
          <h3 className="text-preset-4">Current Balance</h3>
          <p className="text-preset-1">${formatNumber(current)}</p>
        </div>
      </div>
      <div className="w-full max-w-[21.0625rem]">
        <div className="flex w-full max-w-[21.0625rem] flex-col gap-3 rounded-xl bg-white p-6">
          <h3 className="text-preset-4 text-grey-500">Income</h3>
          <p className="text-preset-1 text-grey-900">${formatNumber(income)}</p>
        </div>
      </div>
      <div className="w-full max-w-[21.0625rem]">
        <div className="flex w-full max-w-[21.0625rem] flex-col gap-3 rounded-xl bg-white p-6">
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
