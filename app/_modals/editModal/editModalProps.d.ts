export interface EditModalProps {
  content: "pot" | "budget"
  data_edit_pot?: {
    pot_name: string
    target: number
    theme: string
  }
  data_edit_budget?: {
    budget_category: string
    target: number
    theme: string
  }
  showbudgetCategory: boolean
  showPotName: boolean
  closeModal: () => void
}
