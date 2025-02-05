"use client"

import IconRecurringBills from "@/app/_icons/icon-recurring-bills"
import { selectTotalBills } from "@/redux/finance/financeSelectors"
import { useSelector } from "react-redux"

const TotalBills = () => {
  const totalBills = useSelector(selectTotalBills)

  return (
    <article className="w-full max-w-[21.0625rem] rounded-xl bg-grey-900 p-6">
      <div className="flex flex-col gap-8">
        <IconRecurringBills className="text-white" />
        <div className="text-white">
          <h3 className="text-preset-4"> Total Bills</h3>
          <p className="text-preset-1">${totalBills}</p>
        </div>
      </div>
    </article>
  )
}

export default TotalBills
