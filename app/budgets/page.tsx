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

const BudgetsPage = () => {
  const [showAddBugetModal, setShowAddBugetModal] = useState(false)
  const { budgets } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  useDisableScroll(showAddBugetModal)

  return (
    <main className="w-full px-10 py-8">
      <div className="mb-8 flex w-full items-center justify-between">
        <h1 className="text-preset-1 text-grey-900">Budgets</h1>
        <Button
          variant="primary"
          label="+ Add New Budget"
          style={{ maxWidth: "9.6875rem" }}
          onClick={() => setShowAddBugetModal(true)}
        />
      </div>

      <div className="flex w-full items-start gap-6">
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
    </main>
  )
}

export default BudgetsPage
