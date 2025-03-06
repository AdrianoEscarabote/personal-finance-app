import {
  HttpRequest,
  HttpResponse,
  IControllerPots,
} from "@/controllers/protocols"
import {
  DeletePotParams,
  IPotRepository,
  MoneyParams,
  PotParams,
  PotReturnTypes,
  withdrawMoneyParams,
} from "./protocols"
import { badRequest, ok, serverError } from "@/controllers/helpers"

export class PotsController implements IControllerPots {
  constructor(private readonly potsRepository: IPotRepository) {}

  async addPot(
    HttpRequest: HttpRequest<PotParams>,
  ): Promise<HttpResponse<PotReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.name ||
        !HttpRequest.body?.target ||
        !HttpRequest.body?.theme ||
        !HttpRequest.body?.total
      ) {
        return badRequest("Missing param: id, name, target, theme or total")
      }

      const success = await this.potsRepository.addPot(HttpRequest.body)

      return ok<PotReturnTypes>(success)
    } catch (error) {
      return serverError()
    }
  }

  async editPot(
    HttpRequest: HttpRequest<PotParams>,
  ): Promise<HttpResponse<PotReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.name ||
        !HttpRequest.body?.target ||
        !HttpRequest.body?.theme ||
        !HttpRequest.body?.total ||
        !HttpRequest.body?.pot_id
      ) {
        return badRequest(
          "Missing param: id, pot_id, name, target, theme or total",
        )
      }

      const { success } = await this.potsRepository.editPot(HttpRequest.body)

      return ok<PotReturnTypes>(success)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }

  async deletePot(
    HttpRequest: HttpRequest<DeletePotParams>,
  ): Promise<HttpResponse<PotReturnTypes | string>> {
    try {
      if (!HttpRequest.body?.id || !HttpRequest.body?.pot_id) {
        return badRequest("Missing param: id or pot_id")
      }

      const { success } = await this.potsRepository.deletePot(HttpRequest.body)

      return ok<PotReturnTypes>(success)
    } catch (error) {
      return serverError()
    }
  }

  async addMoney(
    HttpRequest: HttpRequest<MoneyParams>,
  ): Promise<HttpResponse<PotReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.pot_id ||
        !HttpRequest.body?.new_amount
      ) {
        return badRequest("Missing param: id, new_amount or pot_id")
      }

      const { success } = await this.potsRepository.addMoney(HttpRequest.body)

      return ok<PotReturnTypes>(success)
    } catch (error) {
      return serverError()
    }
  }

  async withdrawMoney(
    HttpRequest: HttpRequest<withdrawMoneyParams>,
  ): Promise<HttpResponse<PotReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.pot_id ||
        !HttpRequest.body?.amount
      ) {
        return badRequest("Missing param: id, amount or pot_id")
      }

      const { success } = await this.potsRepository.withdrawMoney(
        HttpRequest.body,
      )

      return ok<PotReturnTypes>(success)
    } catch (error) {
      return serverError()
    }
  }
}
