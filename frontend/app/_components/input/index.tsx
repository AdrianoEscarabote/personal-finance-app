import { forwardRef, Ref, useState } from "react"

import IconHidePassword from "@/app/_icons/icon-hide-password"
import IconShowPassword from "@/app/_icons/icon-show-password"

import { InputProps } from "./InputProps"
import style from "./style.module.css"

const Input = (
  {
    variant,
    id,
    label,
    errors,
    errorMessage,
    showCaracterLeft,
    type = "text",
    ...props
  }: InputProps,
  ref: Ref<HTMLInputElement> | undefined,
) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <label
      htmlFor={id}
      className="relative flex w-full cursor-pointer flex-col"
    >
      <p className="text-preset-5-bold mb-1 text-grey-500">{label}</p>

      <div className="relative w-full">
        <input
          ref={ref}
          id={id}
          className={`${variant === "withPrefix" ? "pl-8" : "pl-3"} text-preset-4 h-[45px] w-full rounded-lg border ${errors && errorMessage ? "border-red outline-red" : "border-grey-500"} text-grey-900 ${variant === "withIcon" && style.icon_search}`}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-500"
          >
            {showPassword ? (
              <IconHidePassword className="text-grey-900" />
            ) : (
              <IconShowPassword className="text-grey-900" />
            )}
          </button>
        )}
      </div>

      {showCaracterLeft && props.maxLength && (
        <p className="mt-1 text-right text-sm text-gray-500">
          {props.maxLength - ((props.value as string)?.length || 0)} of{" "}
          {props.maxLength} characters left
        </p>
      )}

      {variant === "withPrefix" && (
        <div className="absolute left-5 top-[2rem]">
          <span className="text-preset-4 -z-40 text-beige-500">$</span>
        </div>
      )}

      {errors && errorMessage && (
        <span className="text-preset-5 absolute -bottom-5 left-0 w-full text-red">
          {errorMessage}
        </span>
      )}
    </label>
  )
}

export default forwardRef(Input)
