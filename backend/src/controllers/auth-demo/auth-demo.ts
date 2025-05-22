import { Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import { ok, serverError } from "../helpers"
import { IAuthDemoRepository, ReturnAuthDemo } from "./protocols"
import { Secret, sign } from "jsonwebtoken"
import { User } from "@prisma/client"

export class AuthDemoController implements IController {
  constructor(private readonly authDemoRepository: IAuthDemoRepository) {}

  async handle(
    HttpRequest: HttpRequest<unknown>,
    res: Response<unknown>,
  ): Promise<HttpResponse<ReturnAuthDemo | string>> {
    try {
      const body = {
        email: "demo@demo.com",
        password: "demo123",
      }

      const user = await this.authDemoRepository.authDemo(body)

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)

      const secret = process.env.SECRET as Secret

      const token = sign(
        {
          id: user.id,
        },
        secret,
      )

      res.cookie("id", user.id, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: expirationDate,
      })

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: expirationDate,
      })

      return ok("Success")
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
