"use client"

import IconRecurringBills from "@/app/_icons/icon-recurring-bills"
import { selectTotalBills } from "@/redux/finance/financeSelectors"
import { useSelector } from "react-redux"

const TotalBills = () => {
  const totalBills = useSelector(selectTotalBills)

  return (
    <article className="w-full rounded-xl bg-grey-900 p-6 sm:max-w-[21.0625rem]">
      <div className="flex items-center gap-5 xs:flex-col xs:items-start xs:gap-8">
        <IconRecurringBills className="text-white" />
        <div className="text-white">
          <h3 className="text-preset-4"> Total Bills</h3>
          <p className="text-preset-1 mt-2 xs:mt-0">${totalBills}</p>
        </div>
      </div>
    </article>
  )
}

export default TotalBills
