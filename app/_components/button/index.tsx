import Image from "next/image"
import Link from "next/link"

import Loading from "../loading"
import { ButtonProps } from "./ButtonProps"

const Button = ({
  loading,
  variant,
  label,
  showIcon,
  href,
  ...props
}: ButtonProps) => {
  return (
    <>
      {variant === "primary" && (
        <button
          {...props}
          className="text-preset-4-bold relative grid h-[3.3125rem] w-full place-content-center rounded-lg bg-grey-900 text-white transition-all hover:bg-grey-500"
        >
          {loading ? <Loading theme="light" /> : label}
        </button>
      )}
      {variant === "secondary" && (
        <button
          {...props}
          className="text-preset-4-bold relative grid h-[3.3125rem] w-full place-content-center rounded-lg border border-transparent bg-beige-100 text-grey-900 transition-all hover:border hover:border-beige-500 hover:bg-white"
        >
          {loading ? <Loading theme="dark" /> : label}
        </button>
      )}
      {variant === "tertiary" && (
        <Link
          href={href ? href : "#"}
          className="text-preset-4 flex h-[3.3125rem] w-full items-center justify-center gap-3 rounded-lg text-grey-500 transition-all hover:text-grey-900"
          {...(props as Omit<
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
            keyof ButtonProps
          >)}
        >
          {label}
          {showIcon && (
            <Image
              alt=""
              src={"/images/icon-caret-right.svg"}
              width={7}
              height={7}
              data-testid="image"
            />
          )}
        </Link>
      )}
      {variant === "destroy" && (
        <button
          {...props}
          className="text-preset-4-bold grid h-[3.3125rem] w-full place-content-center rounded-lg bg-red text-white transition-all hover:opacity-80"
        >
          {label}
        </button>
      )}
    </>
  )
}

export default Button
