"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useSelector } from "react-redux"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { RootState } from "@/redux/reduxTypes"

import Button from "../_components/button"
import AddModal from "../_modals/addModal"
import PotsCard from "./_components/potsCard"

const Pots = () => {
  const [open, setOpen] = useState(false)
  const { pots } = useSelector((rootState: RootState) => rootState.financeSlice)
  const [showAddPotModal, setShowAddPotModal] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <motion.main
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-20 w-full bg-beige-100 px-5 py-6 md:mb-0 md:px-10 md:py-8"
      >
        <div className="mx-auto mb-8 flex max-w-[69.375rem] items-center justify-between">
          <h1 className="text-preset-1 text-grey-900">Pots</h1>

          <DialogTrigger asChild>
            <Button
              variant="primary"
              label="+ Add New Pot"
              style={{ maxWidth: "8.0625rem" }}
              onClick={() => setShowAddPotModal(true)}
            />
          </DialogTrigger>
        </div>

        <div className="mx-auto flex w-full max-w-[69.375rem] flex-wrap justify-center gap-6 md:justify-start">
          {pots.map((pot, index) => (
            <PotsCard key={index} pot={pot} />
          ))}
        </div>
      </motion.main>
      {showAddPotModal && (
        <DialogContent>
          <AddModal
            title="pot"
            description="pot"
            textButton="Add Pot"
            showPotName
            showTarget
            showMaximumSpend={false}
            showBudgetCategory={false}
            closeModal={() => setOpen(false)}
          />
        </DialogContent>
      )}
    </Dialog>
  )
}

export default Pots
