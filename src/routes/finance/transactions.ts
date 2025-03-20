import express from "express"

import { TransactionController } from "@/controllers/finance-user/transactions/transactions"
import { TransactionRepository } from "@/repositories/finance/transactions"

const TransactionRoute = express.Router()

TransactionRoute.post("/add_transaction", async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const transactionRepository = new TransactionRepository()

  const transactionController = new TransactionController(transactionRepository)

  const { body, statusCode } = await transactionController.handle(
    {
      body: bodyFormated,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default TransactionRoute
