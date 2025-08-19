import Image from "next/image"
import { useSelector } from "react-redux"

import { RootState } from "@/redux/reduxTypes"
import { formatDate } from "@/utils/formatDate"

import Button from "../button"

const Transactions = () => {
  const { transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  return (
    <div>
      <article className="w-full max-w-[38rem] rounded-xl bg-white px-5 py-6 dark:border dark:border-border dark:bg-grey-950 md:p-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-preset-2 text-grey-900 dark:text-grey-100">
            Transactions
          </h3>
          <Button
            variant="tertiary"
            style={{ maxWidth: "4.875rem", maxHeight: "1.3125rem" }}
            showIcon
            href="/transactions"
            label="View All"
          />
        </div>
        <ul>
          {transactions.slice(0, 5).map((transaction, index, arr) => (
            <li
              key={transaction.date}
              className={
                index === arr.length - 1
                  ? "pb-0 pt-5"
                  : "border-b border-grey-100 py-5 dark:border-border"
              }
            >
              <div className="items-cener flex w-full justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    alt=""
                    src={transaction.avatar}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="text-preset-4-bold text-grey-900 dark:text-grey-100">
                    {transaction.name}
                  </p>
                </div>

                <div>
                  <p
                    className={`text-preset-4-bold flex flex-col gap-1 ${transaction.amount > 0 ? "text-green" : "text-grey-900 dark:text-grey-100"}`}
                  >
                    {transaction.amount > 0
                      ? `+$${transaction.amount.toFixed(2)}`
                      : `-$${Math.abs(transaction.amount).toFixed(2)}`}
                    <span className="text-preset-5 text-grey-500 dark:text-grey-300">
                      {formatDate(transaction.date)}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}

export default Transactions
