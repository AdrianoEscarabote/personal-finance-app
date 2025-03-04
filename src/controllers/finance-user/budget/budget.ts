import {
  HttpRequest,
  HttpResponse,
  IControllerBudgets,
} from "@/controllers/protocols"
import {
  BudgetParams,
  budgetsReturnTypes,
  IBudgetsRepository,
} from "./protocols"
import { badRequest, ok, serverError } from "@/controllers/helpers"

export class BudgetController implements IControllerBudgets {
  constructor(private readonly budgetsRepository: IBudgetsRepository) {}

  async addBudget(
    HttpRequest: HttpRequest<BudgetParams>,
  ): Promise<HttpResponse<budgetsReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.budget_name ||
        !HttpRequest.body?.budget_value ||
        !HttpRequest.body?.theme
      ) {
        return badRequest(
          "Missing param: id, budget_name, theme or budget_value",
        )
      }

      const { id, budget_name, budget_value, theme } = HttpRequest.body

      const result = await this.budgetsRepository.addBudget({
        id,
        budget_name,
        budget_value,
        theme,
      })

      return ok<budgetsReturnTypes>(result)
    } catch (error) {
      return serverError()
    }
  }

  async editBudget(
    HttpRequest: HttpRequest<BudgetParams>,
  ): Promise<HttpResponse<budgetsReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.budget_name ||
        !HttpRequest.body?.budget_value ||
        !HttpRequest.body?.theme
      ) {
        return badRequest(
          "Missing param: id, budget_name, theme or budget_value",
        )
      }

      const { id, budget_name, budget_value, theme } = HttpRequest.body

      const result = await this.budgetsRepository.editBudget({
        id,
        budget_name,
        budget_value,
        theme,
      })

      return ok<budgetsReturnTypes>(result)
    } catch (error) {
      return serverError()
    }
  }
}
