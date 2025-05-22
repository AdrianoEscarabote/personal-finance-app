export interface SelectCategoryProps {
  label: string
  category?: string
  setCategory: (string) => void
  dontFilter?: boolean
}
