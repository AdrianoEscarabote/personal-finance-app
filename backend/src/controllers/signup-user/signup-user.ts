import { Response } from "express"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import validator from "validator"
import { badRequest, Conflict, registered } from "../helpers"
import { UserTypes } from "@/models/user"
import { ISignupUserRepository, SignupUserParams } from "./protocols"
import { Secret, sign } from "jsonwebtoken"

export class SignupUserController implements IController {
  constructor(private readonly signupUserRepository: ISignupUserRepository) {}
  async handle(
    httpRequest: HttpRequest<SignupUserParams>,
    res: Response<unknown>,
  ): Promise<HttpResponse<UserTypes | string>> {
    try {
      const requiredFields = ["email", "password"]

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof SignupUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest("Invalid email")
      }

      const user = await this.signupUserRepository.signupUser(httpRequest.body!)

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

      return registered<UserTypes>(user)
    } catch (error) {
      return Conflict()
    }
  }
}
