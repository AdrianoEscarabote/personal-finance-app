export interface TransactionParams {
  id: string
  name: string
  date: string
  category: string
  amount: number
  recurring: boolean
  avatar: string
}

export interface TransactionReturnTypes {
  success: boolean
}

export interface ITransactionRepository {
  addTransaction(params: TransactionParams): Promise<TransactionReturnTypes>
}
