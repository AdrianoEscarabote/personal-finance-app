import { ComponentPropsWithoutRef } from "react"

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string
  errors: boolean
  placeholder?: string
  errorMessage?: string
  variant: "basic" | "withIcon" | "withPrefix" | "withColorTag"
  name: string
  id: string
  colorTag?: string
  showCaracterLeft?: boolean
}
