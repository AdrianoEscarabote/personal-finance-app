export interface BudgetParams {
  id: string
  budget_name: string
  budget_value: number
  theme: string
}

export interface budgetsReturnTypes {
  success: boolean
}

export interface IBudgetsRepository {
  addBudget(params: BudgetParams): Promise<budgetsReturnTypes>
  editBudget(params: BudgetParams): Promise<budgetsReturnTypes>
}
