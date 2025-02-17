"use client"

import { useSelector } from "react-redux"
import BudgetsSpendingSummary from "../_components/budgetsSpendingSummary"
import Button from "../_components/button"
import BudgetsCard from "./_components/budgetsCard"
import { RootState } from "@/redux/reduxTypes"
import AddModal from "../_modals/addModal"
import { useState } from "react"
import { FocusTrap } from "focus-trap-react"
import useDisableScroll from "@/hooks/useDisableScroll"
import { motion } from "framer-motion"

const BudgetsPage = () => {
  const [showAddBugetModal, setShowAddBugetModal] = useState(false)
  const { budgets } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  useDisableScroll(showAddBugetModal)

  return (
    <motion.main
      initial={{ opacity: 0, x: -3 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx:px-10 mb-[88px] w-full px-5 py-6 md:mb-0 md:py-8"
    >
      <div className="mb-8 flex w-full items-center justify-between">
        <h1 className="text-preset-1 text-grey-900">Budgets</h1>
        <Button
          variant="primary"
          label="+ Add New Budget"
          style={{ maxWidth: "9.6875rem" }}
          onClick={() => setShowAddBugetModal(true)}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-6 md:flex-row">
        <BudgetsSpendingSummary />
        <div className="flex w-full flex-wrap items-start gap-6">
          {budgets.map((budget, index) => (
            <BudgetsCard key={index} budget={budget} />
          ))}
        </div>
      </div>
      {showAddBugetModal && (
        <FocusTrap active={showAddBugetModal}>
          <div>
            <AddModal
              title="budget"
              description="budget"
              textButton="Add Budget"
              showBudgetCategory={true}
              showMaximumSpend={true}
              showTarget={false}
              showPotName={false}
              closeModal={() => setShowAddBugetModal(false)}
            />
          </div>
        </FocusTrap>
      )}
    </motion.main>
  )
}

export default BudgetsPage
