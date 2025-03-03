import express, { Request, Response } from "express"

import { LoginUserController } from "@/controllers/login-user/login-user"
import { LoginUserRepository } from "@/repositories/login-user"

const loginRoute = express.Router()

loginRoute.post("/", async (req: Request, res: Response) => {
  const loginUserRepository = new LoginUserRepository()

  const loginUserController = new LoginUserController(loginUserRepository)

  const { statusCode, body } = await loginUserController.handle(
    {
      body: req.body,
    },
    res,
  )

  return res.status(statusCode).send(body)
})

export default loginRoute
