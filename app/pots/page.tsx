"use client"

import { useSelector } from "react-redux"
import Button from "../_components/button"
import PotsCard from "./_components/potsCard"
import { RootState } from "@/redux/reduxTypes"
import { useState } from "react"
import AddModal from "../_modals/addModal"
import useDisableScroll from "@/hooks/useDisableScroll"
import { motion } from "framer-motion"

const Pots = () => {
  const { pots } = useSelector((rootState: RootState) => rootState.financeSlice)
  const [showAddPotModal, setShowAddPotModal] = useState(false)
  useDisableScroll(showAddPotModal)
  return (
    <>
      <motion.main
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full bg-beige-100 px-10 py-8"
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-preset-1 text-grey-900">Pots page</h1>

          <Button
            variant="primary"
            label="+ Add New Pot"
            style={{ maxWidth: "129px" }}
            onClick={() => setShowAddPotModal(true)}
          />
        </div>

        <div className="flex w-full flex-wrap gap-6">
          {pots.map((pot, index) => (
            <PotsCard key={index} pot={pot} />
          ))}
        </div>
      </motion.main>
      {showAddPotModal && (
        <AddModal
          title="pot"
          description="pot"
          textButton="Add Pot"
          closeModal={() => setShowAddPotModal(false)}
          showPotName
          showTarget
          showMaximumSpend={false}
          showBudgetCategory={false}
        />
      )}
    </>
  )
}

export default Pots
