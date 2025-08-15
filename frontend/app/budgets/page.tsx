"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useSelector } from "react-redux"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { RootState } from "@/redux/reduxTypes"

import BudgetsSpendingSummary from "../_components/budgetsSpendingSummary"
import Button from "../_components/button"
import AddModal from "../_modals/addModal"
import BudgetsCard from "./_components/budgetsCard"

const BudgetsPage = () => {
  const [open, setOpen] = useState(false)
  const [showAddBugetModal, setShowAddBugetModal] = useState(false)
  const { budgets } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <motion.main
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx:px-10 mb-[5.5rem] w-full px-5 py-6 md:mb-0 md:px-10 md:py-8"
      >
        <div className="mx-auto mb-8 flex w-full max-w-[69.375rem] items-center justify-between">
          <h1 className="text-preset-1 text-grey-900">Budgets</h1>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              label="+ Add New Budget"
              style={{ maxWidth: "9.6875rem" }}
              onClick={() => setShowAddBugetModal(true)}
            />
          </DialogTrigger>
        </div>

        <div className="mx-auto flex w-full max-w-[69.375rem] flex-col items-start gap-6 md:flex-row">
          <BudgetsSpendingSummary />
          <div className="flex w-full flex-wrap items-start gap-6">
            {budgets.length > 0 ? (
              <>
                {budgets.map((budget, index) => (
                  <BudgetsCard key={index} budget={budget} />
                ))}
              </>
            ) : (
              <h1 className="text-preset-4 text-grey-500">
                You haven&apos;t set up any budgets yet.
              </h1>
            )}
          </div>
        </div>
        {showAddBugetModal && (
          <DialogContent>
            <AddModal
              title="budget"
              description="budget"
              textButton="Add Budget"
              showBudgetCategory={true}
              showMaximumSpend={true}
              showTarget={false}
              showPotName={false}
              closeModal={() => setOpen(false)}
            />
          </DialogContent>
        )}
      </motion.main>
    </Dialog>
  )
}

export default BudgetsPage
