import { badRequest, ok, serverError } from "@/controllers/helpers"
import { HttpRequest, HttpResponse, IController } from "@/controllers/protocols"

import {
  GetDataParams,
  GetDataReturnTypes,
  IGetDataRepository,
} from "./protocols"

export class GetDataController implements IController {
  constructor(private readonly getDataRepository: IGetDataRepository) {}

  async handle(
    HttpRequest: HttpRequest<GetDataParams>,
  ): Promise<HttpResponse<GetDataReturnTypes | string>> {
    try {
      if (!HttpRequest.body?.id) {
        return badRequest("Missing param: id")
      }

      const data = await this.getDataRepository.getData(HttpRequest.body)

      return ok<GetDataReturnTypes>({ data, success: true })
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
