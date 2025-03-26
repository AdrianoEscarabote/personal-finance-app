import {
  HttpRequest,
  HttpResponse,
  IControllerBudgets,
} from "@/controllers/protocols"
import {
  BudgetParams,
  budgetsReturnTypes,
  DeleteBudgetParams,
  EditBudgetParams,
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
      console.log(error)
      return serverError()
    }
  }

  async editBudget(
    HttpRequest: HttpRequest<EditBudgetParams>,
  ): Promise<HttpResponse<budgetsReturnTypes | string>> {
    try {
      if (
        !HttpRequest.body?.id ||
        !HttpRequest.body?.budget_name ||
        !HttpRequest.body?.budget_value ||
        !HttpRequest.body?.theme ||
        !HttpRequest.body?.budget_id
      ) {
        return badRequest(
          "Missing param: id, budget_name, theme, budget_id or budget_value",
        )
      }

      const { id, budget_name, budget_value, budget_id, theme } =
        HttpRequest.body

      const result = await this.budgetsRepository.editBudget({
        id,
        budget_name,
        budget_value,
        theme,
        budget_id,
      })

      return ok<budgetsReturnTypes>(result)
    } catch (error) {
      return serverError()
    }
  }

  async deleteBudget(
    HttpRequest: HttpRequest<DeleteBudgetParams>,
  ): Promise<HttpResponse<budgetsReturnTypes | string>> {
    try {
      if (!HttpRequest.body?.id || !HttpRequest.body?.budget_id) {
        return badRequest("Missing param: id or budget_id")
      }

      const { id, budget_id } = HttpRequest.body

      const result = await this.budgetsRepository.deleteBudget({
        id,
        budget_id,
      })

      return ok<budgetsReturnTypes>(result)
    } catch (error) {
      return serverError()
    }
  }
}
