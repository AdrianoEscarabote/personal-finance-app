/* eslint-disable no-constant-binary-expression */
import { badRequest, ok, serverError } from "@/controllers/helpers"
import { HttpRequest, HttpResponse, IController } from "@/controllers/protocols"

import {
  ITransactionRepository,
  TransactionParams,
  TransactionReturnTypes,
} from "./protocols"

export class TransactionController implements IController {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async handle(
    HttpRequest: HttpRequest<TransactionParams>,
  ): Promise<HttpResponse<TransactionReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.name ||
        !HttpRequest.body?.date ||
        !HttpRequest.body?.category ||
        !HttpRequest.body?.amount ||
        !HttpRequest.body?.avatar ||
        !HttpRequest.body?.recurring === null ||
        !HttpRequest.body?.recurring === undefined
      ) {
        return badRequest(
          "Missing param: id, name, date, category, avatar, amount or recurring",
        )
      }

      const { success } = await this.transactionRepository.addTransaction(
        HttpRequest.body!,
      )

      return ok<TransactionReturnTypes>(success)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
