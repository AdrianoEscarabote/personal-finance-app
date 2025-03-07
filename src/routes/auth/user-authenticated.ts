import express, { Request, Response } from "express"

import { UserAuthenticatedController } from "@/controllers/user-authenticated/user-authenticated"
import { UserAuthenticatedRepository } from "@/repositories/user-authenticated"

const userAuthenticatedRoute = express.Router()

userAuthenticatedRoute.get("/", async (req: Request, res: Response) => {
  const token = req.cookies.token
  const id = req.cookies.id

  const bodyFormated = {
    token,
    id,
  }

  const userAuthenticatedRepository = new UserAuthenticatedRepository()

  const userAuthenticatedController = new UserAuthenticatedController(
    userAuthenticatedRepository,
  )

  const { body, statusCode } = await userAuthenticatedController.handle({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default userAuthenticatedRoute
