import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import useDemoFetch from "@/hooks/useDemoFetch"
import useEscClose from "@/hooks/useEscClose"
import { withdrawMoney } from "@/redux/finance/reducer"

import { withdrawMoneyProps } from "./withdrawMoneyProps"

const WithdrawMoney = ({
  pot_id,
  name,
  target,
  total,
  closeModal,
}: withdrawMoneyProps) => {
  const dispatch = useDispatch()
  useEscClose(closeModal)
  const [loading, setLoading] = useState(false)
  const [amountCalculated, setAmountCalculated] = useState(total)
  const progress = (total / target) * 100
  const { demoFetch } = useDemoFetch()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const amount = watch("amount") || 0

  const newProgress = ((total - Number(amount || 0)) / target) * 100

  const onSubmit = handleSubmit(async () => {
    setLoading(true)
    await demoFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/finance/pots/withdraw_money`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pot_id: pot_id,
          amount: Number(amount),
        }),
      },
    )
    dispatch(withdrawMoney({ pot_name: name, withdraw_amount: Number(amount) }))
    closeModal()
  })

  useEffect(() => {
    setAmountCalculated(total - Number(amount || 0))
  }, [amount, total])

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
          <h3 className="text-preset-1 text-grey-900">
            Withdraw from ‘{name}’
          </h3>
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
          Withdraw from your pot to put money back in your main balance. This
          will reduce the amount you have in this pot.
        </p>

        <div className="mt-5">
          <p className="text-preset-4 flex w-full items-center justify-between text-grey-500">
            New Amount
            <span className="text-preset-1 text-grey-900">
              ${amountCalculated.toFixed(2)}
            </span>
          </p>

          <div className="relative mb-5 mt-2 flex h-2 w-full rounded-md bg-beige-100">
            <div
              className="z-20 h-full rounded-s-full bg-black transition-all duration-300"
              style={{
                width: `${newProgress >= 0 ? newProgress : progress}%`,
              }}
            ></div>
            <div className="h-full w-0.5 bg-beige-100"></div>
            <div
              className={`z-10 h-full w-full self-end rounded-e-full bg-red transition-all duration-300 ${amountCalculated === 0 ? "rounded-full" : ""}`}
              style={{ width: `${progress - newProgress}%` }}
            ></div>
          </div>

          <div className="mb-5 flex w-full items-center justify-between">
            <p className="text-preset-5-bold text-red">
              {newProgress.toFixed(2)}%
            </p>
            <p className="text-preset-5 text-grey-500">Target of ${target}</p>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <fieldset className="flex flex-col gap-5">
            <Input
              id="amount"
              variant="withPrefix"
              errors={errors.amount?.message ? true : false}
              errorMessage={errors.amount?.message as string}
              label="Amount to Withdraw"
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
                  value: total,
                  message: "Amount must be less than the total",
                },
              })}
              data-testid="input"
              inputMode="numeric"
              max={total}
              onInput={(e) => {
                const input = e.target as HTMLInputElement
                input.value = input.value.replace(/[^0-9]/g, "")

                const maxAmount = total
                if (Number(input.value) > maxAmount) {
                  input.value = maxAmount.toString()
                }
              }}
            />

            <Button
              variant="primary"
              loading={loading}
              disabled={loading}
              label="Confirm Withdrawal"
            />
          </fieldset>
        </form>
      </article>
    </div>
  )
}

export default WithdrawMoney
