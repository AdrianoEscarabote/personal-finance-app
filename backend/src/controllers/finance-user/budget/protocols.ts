export interface BudgetParams {
  id: string
  budget_name: string
  budget_value: number
  theme: string
}

export interface budgetsReturnTypes {
  success: boolean
  budget_id?: string
}

export interface DeleteBudgetParams {
  budget_id: string
  id: string
}

export interface EditBudgetParams {
  budget_id: string
  id: string
  budget_name: string
  budget_value: number
  theme: string
}

export interface IBudgetsRepository {
  addBudget(params: BudgetParams): Promise<budgetsReturnTypes>
  editBudget(params: EditBudgetParams): Promise<budgetsReturnTypes>
  deleteBudget(params: DeleteBudgetParams): Promise<budgetsReturnTypes>
}
