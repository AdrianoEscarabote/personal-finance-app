export interface PotParams {
  id: string
  name: string
  target: number
  theme: string
  total: number
  pot_id?: string
}

export interface DeletePotParams {
  id: string
  pot_id: string
}

export interface MoneyParams {
  id: string
  pot_id: string
  new_amount: number
}

export interface withdrawMoneyParams {
  id: string
  pot_id: string
  amount: number
}

export interface PotReturnTypes {
  success: boolean
  pot_id?: string
}

export interface IPotRepository {
  addPot(params: PotParams): Promise<PotReturnTypes>
  editPot(params: PotParams): Promise<PotReturnTypes>
  deletePot(params: DeletePotParams): Promise<PotReturnTypes>
  addMoney(params: MoneyParams): Promise<PotReturnTypes>
  withdrawMoney(params: withdrawMoneyParams): Promise<PotReturnTypes>
}
