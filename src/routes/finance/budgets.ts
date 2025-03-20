import express from "express"

import { BudgetController } from "@/controllers/finance-user/budget/budget"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { BudgetRepository } from "@/repositories/finance/budget"

const budgetsRoute = express.Router()

budgetsRoute.post("/add_budget", authMiddleware, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const budgetRepository = new BudgetRepository()

  const budgetController = new BudgetController(budgetRepository)

  const { body, statusCode } = await budgetController.addBudget({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

budgetsRoute.post("/edit_budget", authMiddleware, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const budgetRepository = new BudgetRepository()

  const budgetController = new BudgetController(budgetRepository)

  const { body, statusCode } = await budgetController.editBudget({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default budgetsRoute
