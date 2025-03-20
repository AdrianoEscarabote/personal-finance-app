import Image from "next/image"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import useEscClose from "@/hooks/useEscClose"
import { addMoney } from "@/redux/finance/reducer"

import { AddMoneyProps } from "./addMoneyProps"

const AddMoney = ({
  pot_id,
  name,
  total,
  target,
  theme,
  closeModal,
}: AddMoneyProps) => {
  const dispatch = useDispatch()

  useEscClose(closeModal)
  const progress = (total / target) * 100
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const amount = watch("amount") || 0

  const newProgress = ((total + Number(amount || 0)) / target) * 100

  const onSubmit = handleSubmit(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/finance/pots/add_money`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pot_id: pot_id,
        new_amount: Number(amount),
      }),
    })

    dispatch(addMoney({ pot_name: name, new_amount: Number(amount) }))
    closeModal()
  })

  return (
    <div
      onClick={closeModal}
      className={`fixed left-0 top-0 z-40 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 p-5`}
    >
      <article
        className="max-w-[35rem] rounded-xl bg-white p-8 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-1 text-grey-900">Add to ‘{name}’</h3>
          <button className="rounded-full" onClick={closeModal}>
            <Image
              src={"/images/icon-close-modal.svg"}
              alt=""
              width={32}
              height={32}
            />
          </button>
        </div>
        <p className="text-preset-4 mb-5 text-grey-500">
          Add money to your pot to keep it separate from your main balance. As
          soon as you add this money, it will be deducted from your current
          balance.
        </p>

        <div className="mt-5">
          <p className="text-preset-4 flex w-full items-center justify-between text-grey-500">
            New Amount
            <span className="text-preset-1 text-grey-900">
              ${total.toFixed(2)}
            </span>
          </p>

          <div className="relative mb-5 mt-2 h-2 w-full bg-beige-100">
            <div
              className="absolute z-10 h-2 w-8 rounded-s-full border-r-2 border-grey-100 bg-black"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              style={{
                width: `${Math.min(newProgress, 100)}%`,
                backgroundColor: theme,
              }}
              className="absolute z-0 h-full rounded-full transition-all duration-300"
            ></div>
          </div>

          <div className="mb-5 flex w-full items-center justify-between">
            <p className="text-preset-5-bold text-green">
              {newProgress.toFixed(2)}%
            </p>
            <p className="text-preset-5 text-grey-500">Target of ${target}</p>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <fieldset className="flex flex-col gap-5">
            <Input
              variant="basic"
              errors={errors.amount?.message ? true : false}
              errorMessage={errors.amount?.message as string}
              id="amount"
              label="Amount to Add"
              data-testid="amount_input"
              {...register("amount", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Only numbers are allowed",
                },
                min: {
                  value: 0.01,
                  message: "Amount must be greater than zero",
                },
                max: {
                  value: target - total,
                  message: "Amount must be less than the target",
                },
              })}
              inputMode="numeric"
              max={target - total}
              onInput={(e) => {
                const input = e.target as HTMLInputElement
                input.value = input.value.replace(/[^0-9]/g, "")

                const maxAmount = target - total
                if (Number(input.value) > maxAmount) {
                  input.value = maxAmount.toString()
                }
              }}
            />

            <Button type="submit" variant="primary" label="Confirm Addition" />
          </fieldset>
        </form>
      </article>
    </div>
  )
}

export default AddMoney
