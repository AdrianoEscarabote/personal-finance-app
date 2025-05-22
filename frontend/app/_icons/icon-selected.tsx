import * as React from "react"
import { SVGProps } from "react"
const IconSelected = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 .5A6.5 6.5 0 1 0 13.5 7 6.507 6.507 0 0 0 7 .5zm2.854 5.354-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L6 8.293l3.146-3.147a.5.5 0 1 1 .708.708z"
    />
  </svg>
)
export default IconSelected
