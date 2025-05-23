import express from "express"

import { GetDataController } from "@/controllers/finance-user/get-data/get-data"
import { authMiddleware } from "@/middlewares/authMiddleware"
import { GetDataRepository } from "@/repositories/finance/get-data"

const getDataRoute = express.Router()

getDataRoute.get("/", authMiddleware, async (req, res) => {
  const id = req.cookies.id

  const bodyFormated = {
    id,
  }

  const getDataRepository = new GetDataRepository()

  const getDataController = new GetDataController(getDataRepository)

  const { body, statusCode } = await getDataController.handle(
    {
      body: bodyFormated,
    },
    res,
  )

  return res.status(statusCode).send(body)
})

export default getDataRoute
