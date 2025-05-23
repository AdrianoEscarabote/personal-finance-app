import express, { Request, Response } from "express"

import { SignupUserController } from "@/controllers/signup-user/signup-user"
import { SignupUserRepository } from "@/repositories/signup-user"

const signupRoute = express.Router()

signupRoute.post("/", async (req: Request, res: Response) => {
  const signupUserRepository = new SignupUserRepository()

  const signupUserController = new SignupUserController(signupUserRepository)

  const { body, statusCode } = await signupUserController.handle(
    {
      body: req.body,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default signupRoute
