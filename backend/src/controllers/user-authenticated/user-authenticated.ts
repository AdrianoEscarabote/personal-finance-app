import { HttpRequest, HttpResponse, IController } from "../protocols"
import {
  IUserAuthenticatedRepository,
  UserAuthenticatedParams,
  UserAuthenticatedReturn,
} from "./protocols"
import { badRequest, ok } from "../helpers"

export class UserAuthenticatedController implements IController {
  constructor(
    private readonly ChecktokenRepository: IUserAuthenticatedRepository,
  ) {}

  async handle(
    HttpRequest: HttpRequest<UserAuthenticatedParams>,
  ): Promise<HttpResponse<UserAuthenticatedReturn | string>> {
    try {
      if (!HttpRequest.body?.id || !HttpRequest.body?.token) {
        return badRequest("token and id not found!")
      }

      const { msg } = await this.ChecktokenRepository.authenticateUser(
        HttpRequest.body,
      )

      return ok<UserAuthenticatedReturn>(msg)
    } catch (error) {
      console.log(error)
      return badRequest("token and id not found!")
    }
  }
}
