import { format } from "date-fns"

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), "dd MMM yyyy")
}
