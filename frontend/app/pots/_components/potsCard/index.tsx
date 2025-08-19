"use client"

import { useRef, useState } from "react"
import { useDispatch } from "react-redux"

import Button from "@/app/_components/button"
import IconEllipsis from "@/app/_icons/icon-ellipsis"
import AddMoney from "@/app/_modals/addMoney"
import DeleteModal from "@/app/_modals/deleteModal"
import EditModal from "@/app/_modals/editModal"
import WithdrawMoney from "@/app/_modals/withdrawMoney"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import useDemoFetch from "@/hooks/useDemoFetch"
import { deletePot } from "@/redux/finance/reducer"

import { PotsCardProps } from "./potsCardProps"

const PotsCard = ({ pot }: PotsCardProps) => {
  const dispatch = useDispatch()
  const { demoFetch } = useDemoFetch()

  const [activeModal, setActiveModal] = useState<
    null | "addMoney" | "withdraw" | "edit" | "delete"
  >(null)
  const closeModal = () => setDialogOpen(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const openModal = (modal: typeof activeModal) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setActiveModal(modal)
    setDialogOpen(true)
  }

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      closeTimeout.current = setTimeout(() => setActiveModal(null), 400)
    }
  }

  const [showOptions, setShowOptions] = useState(false)
  const progress = (pot.total / pot.target) * 100

  const handleDelete = async () => {
    await demoFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/finance/pots/delete_pot`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pot_id: pot.id,
        }),
      },
    )

    dispatch(deletePot({ id: pot.id }))
    closeModal()
  }

  return (
    <>
      <article className="w-full sm:max-w-[32.375rem]">
        <div className="flex w-full flex-wrap gap-6">
          <div
            key={pot.name}
            className="w-full rounded-xl bg-white p-6 dark:border dark:border-border dark:bg-grey-950 sm:max-w-[32.375rem]"
          >
            <div className="relative mb-8 flex items-center justify-between">
              <div className="flex max-h-6 items-center gap-3">
                <div
                  style={{ backgroundColor: pot.theme }}
                  className="h-4 w-4 rounded-full"
                ></div>
                <p className="text-preset-2 text-grey-900 dark:text-grey-100">
                  {pot.name}
                </p>
              </div>
              <button
                className="relative grid h-6 w-6 place-content-center text-grey-900 transition hover:text-grey-300 dark:text-grey-100"
                onClick={() => setShowOptions(!showOptions)}
                data-testid="ellipsis_button"
              >
                <IconEllipsis className="text-inherit" />
              </button>
              <div
                className={`absolute right-0 top-10 z-20 w-[8.25rem] rounded-lg bg-white px-5 py-3 shadow-xl transition-all duration-300 dark:border dark:border-border dark:bg-grey-950 ${showOptions ? "max-h-[6.0625rem] opacity-100" : "max-h-0 opacity-0"}`}
                style={{
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                }}
              >
                <button
                  className="mb-3 text-grey-900 dark:text-grey-100"
                  tabIndex={!showOptions ? -1 : undefined}
                  onClick={() => {
                    setShowOptions(false)
                    openModal("edit")
                  }}
                  disabled={!showOptions && true}
                >
                  Edit Pot
                </button>
                <div className="h-[0.0625rem] w-full bg-grey-100 dark:bg-border"></div>
                <button
                  className="mt-3 text-red"
                  tabIndex={!showOptions ? -1 : undefined}
                  onClick={() => {
                    setShowOptions(false)
                    openModal("delete")
                  }}
                  disabled={!showOptions && true}
                >
                  Delete Pot
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-preset-4 flex items-center justify-between text-grey-500 dark:text-grey-300">
                Total Saved:{" "}
                <span className="text-preset-1 text-grey-900 dark:text-grey-100">
                  ${pot.total.toFixed(2)}
                </span>
              </p>
            </div>

            <div className="relative mt-2 h-2 w-full rounded-full bg-grey-100 dark:bg-grey-975">
              <div
                style={{ width: `${progress}%`, backgroundColor: pot.theme }}
                className="absolute h-full rounded-full transition-all duration-300"
              ></div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-preset-5-bold text-grey-500 dark:text-grey-300">
                {progress.toFixed(2)}%
              </p>
              <p className="text-preset-5 text-grey-500 dark:text-grey-300">
                Target of ${pot.target}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button
                variant="secondary"
                label="+ Add Money"
                onClick={() => openModal("addMoney")}
                disabled={pot.total >= pot.target}
                style={{ opacity: pot.total >= pot.target ? 0.5 : 1 }}
              />
              <Button
                variant="secondary"
                label="Withdraw"
                onClick={() => openModal("withdraw")}
                disabled={pot.total === 0}
                style={{ opacity: pot.total === 0 ? 0.5 : 1 }}
              />
            </div>
          </div>
        </div>
      </article>

      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          {activeModal === "addMoney" && (
            <AddMoney closeModal={() => setDialogOpen(false)} {...pot} />
          )}
          {activeModal === "withdraw" && (
            <WithdrawMoney closeModal={() => setDialogOpen(false)} {...pot} />
          )}
          {activeModal === "edit" && (
            <EditModal
              data_edit_pot={{
                pot_id: pot.id,
                pot_name: pot.name,
                target: pot.target,
                theme: pot.theme,
              }}
              content="pot"
              showPotName
              showbudgetCategory={false}
              closeModal={() => setDialogOpen(false)}
            />
          )}
          {activeModal === "delete" && (
            <DeleteModal
              title={pot.name}
              description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
              onCancel={() => setDialogOpen(false)}
              onConfirm={handleDelete}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PotsCard
