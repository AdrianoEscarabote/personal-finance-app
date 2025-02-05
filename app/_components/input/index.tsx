import { forwardRef, Ref } from "react"
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
    ...props
  }: InputProps,
  ref: Ref<HTMLInputElement> | undefined,
) => {
  return (
    <label
      htmlFor={id}
      className="relative flex w-full cursor-pointer flex-col"
    >
      <p className="text-preset-5-bold mb-1 text-grey-500">{label}</p>

      <input
        ref={ref}
        id={id}
        className={`${variant === "withPrefix" ? "pl-8" : "pl-3"} text-preset-4 h-[45px] w-full rounded-lg border border-grey-500 text-grey-900 ${variant === "withIcon" && style.icon_search}`}
        {...props}
      />

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
        <span className="text-preset-5 absolute -bottom-5 left-0 w-full text-grey-500">
          {errorMessage}
        </span>
      )}
    </label>
  )
}

export default forwardRef(Input)
