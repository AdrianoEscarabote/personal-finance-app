import express from "express"

import { AuthDemoController } from "@/controllers/auth-demo/auth-demo"
import { AuthDemoRepository } from "@/repositories/auth-demo"

const authDemoRoute = express.Router()

authDemoRoute.post("/", async (req, res) => {
  const authDemoRepository = new AuthDemoRepository()

  const authDemoController = new AuthDemoController(authDemoRepository)

  const { body, statusCode } = await authDemoController.handle(req, res)

  return res.status(statusCode).send(body)
})

export default authDemoRoute
