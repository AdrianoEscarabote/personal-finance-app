import { Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import { ILoginUserRepository, LoginUserParams } from "./protocols"
import { badRequest, logged, notFound } from "../helpers"
import { Secret, sign } from "jsonwebtoken"
import { UserTypes } from "@/models/user"
import validator from "validator"

export class LoginUserController implements IController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}
  async handle(
    httpRequest: HttpRequest<LoginUserParams>,
    res: Response<unknown>,
  ): Promise<HttpResponse<UserTypes | string>> {
    try {
      const requiredFields = ["email", "password"]

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof LoginUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest("Invalid email")
      }

      if (!httpRequest?.body?.password?.length) {
        return badRequest("Field password is required")
      }

      const user = await this.loginUserRepository.loginUser(httpRequest.body)

      const secret = process.env.SECRET as Secret

      const token = sign(
        {
          id: user.id,
        },
        secret,
      )

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)

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

      return logged<UserTypes>(user)
    } catch (error) {
      console.log(error)
      return notFound()
    }
  }
}
