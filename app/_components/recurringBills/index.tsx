import { useSelector } from "react-redux"
import Button from "../button"
import { selectFinanceStats } from "@/redux/finance/financeSelectors"

const RecurringBills = () => {
  const { paidBills, dueSoon, totalUpcoming } = useSelector(selectFinanceStats)

  return (
    <article className="w-full max-w-[26.75rem] rounded-xl bg-white p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-preset-2 text-grey-900">Recurring Bills</h3>
        <Button
          variant="tertiary"
          style={{ maxWidth: "6.125rem", maxHeight: "1.3125rem" }}
          showIcon
          href="/pots"
          label="See Details"
        />
      </div>

      <ul className="flex flex-col gap-3">
        <li className="text-preset-4 flex items-center justify-between rounded-lg border-l-4 border-green bg-beige-100 px-4 py-5 text-grey-500">
          Paid Bills
          <span className="text-preset-4-bold text-grey-900">${paidBills}</span>
        </li>
        <li className="text-preset-4 flex items-center justify-between rounded-lg border-l-4 border-yellow bg-beige-100 px-4 py-5 text-grey-500">
          Total Upcoming
          <span className="text-preset-4-bold text-grey-900">
            ${totalUpcoming}
          </span>
        </li>
        <li className="text-preset-4 flex items-center justify-between rounded-lg border-l-4 border-cyan bg-beige-100 px-4 py-5 text-grey-500">
          Due Soon
          <span className="text-preset-4-bold text-grey-900">${dueSoon}</span>
        </li>
      </ul>
    </article>
  )
}

export default RecurringBills
