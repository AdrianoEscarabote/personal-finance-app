"use client"

import { DialogTrigger } from "@radix-ui/react-dialog"
import { motion } from "framer-motion"
import { useState } from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import Button from "../_components/button"
import AddTransactionModal from "../_modals/addTransaction"
import TransactionsTable from "./_components/transactionsTable"

const Transactions = () => {
  const [open, setOpen] = useState(false)
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <motion.main
        initial={{ opacity: 0, x: -3 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full bg-beige-100"
      >
        <div className="mb:mb-0 mb-20 px-5 py-6 md:px-10 md:py-8">
          <div className="mx-auto mb-8 flex w-full max-w-[69.375rem] items-center justify-between">
            <h1 className="text-preset-1 mb-6 text-grey-900 md:mb-8">
              Transactions
            </h1>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                label="+ Add New Transaction"
                style={{ maxWidth: "185px" }}
                onClick={() => setShowAddTransactionModal(true)}
              />
            </DialogTrigger>
          </div>

          <div className="flex justify-center">
            <TransactionsTable />
          </div>
        </div>
      </motion.main>
      {showAddTransactionModal && (
        <DialogContent>
          <AddTransactionModal closeModal={() => setOpen(false)} />
        </DialogContent>
      )}
    </Dialog>
  )
}

export default Transactions
