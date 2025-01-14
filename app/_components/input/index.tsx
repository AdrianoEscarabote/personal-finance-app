import { forwardRef, Ref } from "react"
import { InputProps } from "./InputProps"
import Image from "next/image"

const Input = (
  { variant, id, label, errors, errorMessage, ...props }: InputProps,
  ref: Ref<HTMLInputElement> | undefined,
) => {
  return (
    <label htmlFor={id} className="relative flex cursor-pointer flex-col">
      <p className="text-preset-5-bold text-grey-500">{label}</p>

      <input
        ref={ref}
        id={id}
        className="h-[45px] w-full max-w-[320px] rounded-lg border border-grey-500 pl-3"
        {...props}
      />

      {variant == "withIcon" && (
        <Image src={"/images/icon-search.svg"} alt="" width={20} height={20} />
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
