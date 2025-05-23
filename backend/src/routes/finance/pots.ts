import express from "express"

import { PotsController } from "@/controllers/finance-user/pots/pots"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { PotsRepository } from "@/repositories/finance/pots"

const potsRoute = express.Router()

potsRoute.post("/add_pot", authMiddleware, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const potsRepository = new PotsRepository()

  const potsController = new PotsController(potsRepository)

  const { body, statusCode } = await potsController.addPot({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

potsRoute.post("/edit_pot", authMiddleware, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const potsRepository = new PotsRepository()

  const potsController = new PotsController(potsRepository)

  const { body, statusCode } = await potsController.editPot({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

potsRoute.delete("/delete_pot", authMiddleware, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const potsRepository = new PotsRepository()

  const potsController = new PotsController(potsRepository)

  const { body, statusCode } = await potsController.deletePot({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

potsRoute.post("/add_money", authMiddleware, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const potsRepository = new PotsRepository()

  const potsController = new PotsController(potsRepository)

  const { body, statusCode } = await potsController.addMoney({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

potsRoute.post("/withdraw_money", authMiddleware, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    ...req.body,
    id,
  }

  const potsRepository = new PotsRepository()

  const potsController = new PotsController(potsRepository)

  const { body, statusCode } = await potsController.withdrawMoney({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default potsRoute
