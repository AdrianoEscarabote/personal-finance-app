"use client"

import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Button from "@/app/_components/button"
import IconEllipsis from "@/app/_icons/icon-ellipsis"
import DeleteModal from "@/app/_modals/deleteModal"
import EditModal from "@/app/_modals/editModal"
import useDemoFetch from "@/hooks/useDemoFetch"
import useDisableScroll from "@/hooks/useDisableScroll"
import { deleteBudget } from "@/redux/finance/reducer"
import { RootState } from "@/redux/reduxTypes"
import { formatDate } from "@/utils/formatDate"

import { BudgetsCardProps } from "./budgetsCardProps"

const BudgetsCard = ({ budget }: BudgetsCardProps) => {
  const dispatch = useDispatch()
  const { demoFetch } = useDemoFetch()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  useDisableScroll(showEditModal || showDeleteModal)
  const { transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  const [showOptions, setShowOptions] = useState(false)
  const transactionsFiltered = transactions.filter(
    (transaction) => transaction.category === budget.category,
  )
  const totalSpend = transactionsFiltered
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0)

  const progress =
    budget.maximum > 0 ? Math.min((totalSpend / budget.maximum) * 100, 100) : 0

  const handleDeleteBudget = async () => {
    await demoFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/finance/budgets/delete_budget`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget_id: budget.id,
        }),
      },
    )
    dispatch(deleteBudget({ id: budget.id }))
    setShowDeleteModal(false)
  }

  return (
    <>
      <article className="w-full md:max-w-[38rem]">
        <div
          key={budget.category}
          className="rounded-xl bg-white px-5 py-6 md:p-8"
        >
          <div className="relative mb-5 flex w-full items-center justify-between">
            <h2 className="text-preset-2 flex items-center gap-3 text-grey-900">
              <div
                style={{ backgroundColor: budget.theme }}
                className="h-4 w-4 rounded-full"
              ></div>
              {budget.category}
            </h2>
            <button
              className="relative grid h-6 w-6 place-content-center text-grey-900 transition hover:text-grey-300"
              onClick={() => setShowOptions(!showOptions)}
            >
              <IconEllipsis className="text-inherit" />
            </button>
            <div
              className={`absolute right-0 top-10 z-20 w-[9.5rem] rounded-lg bg-white px-5 py-3 shadow-xl transition-all duration-300 ${showOptions ? "max-h-[7.9375rem] opacity-100" : "max-h-0 opacity-0"}`}
              style={{
                transition: "max-height 0.3s ease, opacity 0.3s ease",
              }}
            >
              <button
                className="mb-3 text-grey-900"
                tabIndex={!showOptions ? -1 : undefined}
                onClick={() => {
                  setShowOptions(false)
                  setShowEditModal(!showEditModal)
                }}
                disabled={!showOptions && true}
              >
                Edit Budget
              </button>
              <div className="h-[0.0625rem] w-full bg-grey-100"></div>
              <button
                className="mt-3 text-red"
                tabIndex={!showOptions ? -1 : undefined}
                onClick={() => {
                  setShowOptions(false)
                  setShowDeleteModal(!showDeleteModal)
                }}
                disabled={!showOptions && true}
              >
                Delete Budget
              </button>
            </div>
          </div>
          <div>
            <p className="text-preset-4 text-grey-500">
              Maximum of ${budget.maximum.toFixed(2)}
            </p>

            <div className="relative mt-2 w-full overflow-hidden rounded-[0.25rem] bg-grey-100 p-1">
              <div
                style={{
                  width: `${progress}%`,
                  backgroundColor: budget.theme,
                }}
                data-testid="progress-bar"
                className="h-6 max-w-[33.5rem] rounded-[0.25rem]"
              ></div>
            </div>
          </div>

          <div className="mt-5 flex justify-between">
            <div className="flex w-full items-center gap-4">
              <div
                className="h-[2.6875rem] w-1 rounded-full"
                style={{ backgroundColor: budget.theme }}
              ></div>
              <p className="text-preset-5 flex flex-col items-start text-grey-500">
                <span className="text-preset-4-bold text-grey-900">
                  ${budget.maximum.toFixed(2)}
                </span>
                Spent
              </p>
            </div>
            <div className="flex w-full items-center gap-4">
              <div className="h-[2.6875rem] w-1 rounded-full bg-beige-100"></div>
              <p className="text-preset-5 flex flex-col items-start text-grey-500">
                Remaining
                <span className="text-preset-4-bold text-grey-900">
                  ${Math.max(budget.maximum - totalSpend, 0).toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-beige-100 p-5">
            <div className="mb-3 flex w-full items-center justify-between">
              <h3 className="text-preset-3 text-grey-900">Latest Spending</h3>

              <Button
                showIcon
                variant="tertiary"
                label="See All"
                href={`/transactions?category=${encodeURIComponent(budget.category)}`}
                style={{ maxWidth: "4.4375rem" }}
              />
            </div>

            <div>
              {transactionsFiltered
                .slice(0, 3)
                .map((transaction, index, arr) => (
                  <div
                    key={transaction.date}
                    className={` ${
                      index === arr.length - 1
                        ? "pb-0 pt-3"
                        : "border-b border-[#E3DFDC] py-3"
                    } flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        alt=""
                        src={transaction.avatar}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <p className="text-preset-5-bold text-grey-900">
                        {transaction.name}
                      </p>
                    </div>

                    <p className="text-preset-5 flex flex-col items-end gap-1 text-grey-500">
                      <span className="text-preset-5-bold text-grey-900">
                        -${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </article>
      {showEditModal && (
        <EditModal
          data_edit_budget={{
            budget_id: budget.id,
            budget_category: budget.category,
            target: budget.maximum,
            theme: budget.theme,
          }}
          content="budget"
          showbudgetCategory={true}
          showPotName={false}
          closeModal={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          title={budget.category}
          description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
          onCancel={() => setShowDeleteModal(!showDeleteModal)}
          onConfirm={handleDeleteBudget}
        />
      )}
    </>
  )
}

export default BudgetsCard
