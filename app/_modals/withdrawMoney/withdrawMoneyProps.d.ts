export interface withdrawMoneyProps {
  name: string
  target: number
  total: number
  closeModal: () => void
  pot_id?: string
}
