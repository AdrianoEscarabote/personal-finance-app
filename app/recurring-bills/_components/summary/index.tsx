"use client"

import { useSelector } from "react-redux"

import { selectFinanceStats } from "@/redux/finance/financeSelectors"

const Summary = () => {
  const { dueSoon, paidBills, totalUpcoming } = useSelector(selectFinanceStats)

  return (
    <article className="w-full rounded-xl bg-white p-5 sm:max-w-[21.0625rem]">
      <div>
        <h3 className="text-preset-3 mb-5 text-grey-900">Summary</h3>
        <div>
          <p className="text-preset-5 flex w-full items-center justify-between border-b border-grey-100 pb-3 text-grey-500">
            Paid Bills
            <span className="text-preset-5-bold text-grey-900">
              {paidBills.length} (${paidBills.amount})
            </span>
          </p>
          <p className="text-preset-5 flex w-full items-center justify-between border-b border-grey-100 pb-3 pt-3 text-grey-500">
            Total Upcoming
            <span className="text-preset-5-bold text-grey-900">
              {totalUpcoming.length} (${totalUpcoming.amount})
            </span>
          </p>
          <p className="text-preset-5 flex w-full items-center justify-between pt-3 text-red">
            Due Soon
            <span className="text-preset-5-bold">
              {dueSoon.length} (${dueSoon.amount})
            </span>
          </p>
        </div>
      </div>
    </article>
  )
}

export default Summary
