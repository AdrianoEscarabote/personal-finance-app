import { ComponentPropsWithoutRef } from "react"

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "secondary" | "tertiary" | "destroy"
  label: string
  href?: string
  showIcon?: boolean
  loading?: boolean
}
