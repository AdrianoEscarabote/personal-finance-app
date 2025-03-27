export interface GetDataParams {
  id: string
}

export interface GetDataReturnTypes {
  finance: {
    balance: {
      current: number
      income: number
      expenses: number
    }
    transactions: {
      id: string
      avatar: string
      name: string
      category: string
      date: string
      amount: number
      recurring: boolean
    }[]
    budget: {
      id: string
      category: string
      maximum: number
      theme: string
    }[]
    pots: {
      id: string
      name: string
      target: number
      total: number
      theme: string
    }[]
  }
  success: boolean
}

export interface IGetDataRepository {
  getData(params: GetDataParams): Promise<GetDataReturnTypes>
}
