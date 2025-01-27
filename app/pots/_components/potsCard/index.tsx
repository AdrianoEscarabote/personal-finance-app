"use client"
import Button from "@/app/_components/button"
import IconEllipsis from "@/app/_icons/icon-ellipsis"
import { useState } from "react"
import { PotsCardProps } from "./potsCardProps"
import EditModal from "@/app/_modals/editModal"
import DeleteModal from "@/app/_modals/deleteModal"

const PotsCard = ({ pot }: PotsCardProps) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const progress = (pot.total / pot.target) * 100

  return (
    <>
      <article className="">
        <div className="flex w-full flex-wrap gap-6">
          <div
            key={pot.name}
            className="w-full max-w-[32.375rem] rounded-xl bg-white p-6"
          >
            <div className="relative mb-8 flex items-center justify-between">
              <div className="flex max-h-6 items-center gap-3">
                <div
                  style={{ backgroundColor: pot.theme }}
                  className="h-4 w-4 rounded-full"
                ></div>
                <p className="text-preset-2 text-grey-900">{pot.name}</p>
              </div>
              <button
                className="relative grid h-6 w-6 place-content-center text-grey-900 transition hover:text-grey-300"
                onClick={() => setShowOptions(!showOptions)}
                data-testid="ellipsis_button"
              >
                <IconEllipsis className="text-inherit" />
              </button>
              <div
                className={`absolute right-0 top-10 z-20 w-[8.25rem] rounded-lg bg-white px-5 py-3 shadow-xl transition-all duration-300 ${showOptions ? "max-h-[6.0625rem] opacity-100" : "max-h-0 opacity-0"}`}
                style={{
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                }}
              >
                <button
                  className="mb-3 text-grey-900"
                  tabIndex={!showOptions ? -1 : undefined}
                  onClick={() => {
                    setShowOptions(false)
                    setShowEditModal(true)
                  }}
                >
                  Edit Pot
                </button>
                <div className="h-[0.0625rem] w-full bg-grey-100"></div>
                <button
                  className="mt-3 text-red"
                  tabIndex={!showOptions ? -1 : undefined}
                  onClick={() => {
                    setShowOptions(false)
                    setShowDeleteModal(true)
                  }}
                >
                  Delete Pot
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-preset-4 flex items-center justify-between text-grey-500">
                Total Saved:{" "}
                <span className="text-preset-1 text-grey-900">
                  ${pot.total.toFixed(2)}
                </span>
              </p>
            </div>

            <div className="relative mt-2 h-2 w-full rounded-full bg-grey-100">
              <div
                style={{ width: `${progress}%`, backgroundColor: pot.theme }}
                className="absolute h-full rounded-full"
              ></div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-preset-5-bold text-grey-500">
                {progress.toFixed(2)}%
              </p>
              <p className="text-preset-5 text-grey-500">
                Target of ${pot.target}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button variant="secondary" label="+ Add Money" />
              <Button variant="secondary" label="Withdraw" />
            </div>
          </div>
        </div>
      </article>
      {showEditModal && (
        <EditModal
          title={pot.name}
          description="If your saving targets change, feel free to update your pots."
          showPotName
          showbudgetCategory={false}
          closeModal={() => setShowEditModal(!showEditModal)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          title={pot.name}
          description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
          onCancel={() => setShowDeleteModal(!setShowDeleteModal)}
          onConfirm={() => {}}
        />
      )}
    </>
  )
}

export default PotsCard
