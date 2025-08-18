"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import SelectCategory from "@/app/_components/selectCategory"
import { Button as ButtonShadCn } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useDemoFetch from "@/hooks/useDemoFetch"
import { addTransaction } from "@/redux/finance/reducer"
import { RootState } from "@/redux/reduxTypes"
import { cn } from "@/utils/cn"
import { getAvatar } from "@/utils/getAvatar"

import { AddTransactionProps } from "./addTransactionProps"

interface formTypes {
  name: string
  category: string
  date: string
  amount: string
  recurring: boolean
}

const AddTransactionModal = ({ closeModal }: AddTransactionProps) => {
  const dispatch = useDispatch()

  const { budgets, transactions } = useSelector(
    (rootState: RootState) => rootState.financeSlice,
  )
  const [loading, setLoading] = useState(false)
  const { demoFetch } = useDemoFetch()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const formattedDate = date ? date.toISOString() : ""

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formTypes>()

  const name = watch("name", "")
  const recurring = watch("recurring") || false

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const avatar = getAvatar(selectedCategory)

    await demoFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/finance/transactions/add_transaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          category: selectedCategory,
          date: formattedDate,
          amount: parseFloat(data.amount),
          recurring,
          avatar,
        }),
      },
    )

    dispatch(
      addTransaction({
        amount: parseFloat(data.amount),
        category: selectedCategory,
        date: formattedDate,
        name: data.name,
        avatar,
        recurring,
      }),
    )

    const budget = budgets.find((b) => b.category === selectedCategory)

    if (!budget || Number(data.amount) > 0) return closeModal()

    const totalFromCategory = transactions
      .filter((t) => t.category === selectedCategory && t.amount < 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0)

    const newTotal = totalFromCategory + Math.abs(Number(data.amount))

    if (newTotal > budget.maximum) {
      await demoFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/finance/budgets/edit_budget`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            budget_id: budget.id,
            budget_name: budget.category,
            budget_value: totalFromCategory + Number(data.amount),
            theme: budget.theme,
          }),
        },
      )
    }
  })

  return (
    <article className="w-full max-w-[35rem] rounded-xl bg-white dark:bg-grey-975">
      <div className="mb-4 flex items-center justify-between">
        <DialogTitle asChild>
          <h3 className="text-preset-1 text-grey-900 dark:text-grey-100">
            Add New Transaction
          </h3>
        </DialogTitle>
      </div>
      <DialogDescription asChild>
        <p className="text-preset-4 mb-4 text-grey-500 dark:text-grey-300">
          Enter the details to add a new transaction and keep your finances up
          to date
        </p>
      </DialogDescription>

      <form onSubmit={onSubmit}>
        <fieldset className="flex w-full flex-col gap-3">
          <Input
            variant="basic"
            errors={errors.name?.message ? true : false}
            errorMessage={errors.name?.message as string}
            id="name"
            label="Name"
            value={name}
            maxLength={30}
            showCaracterLeft
            {...register("name", {
              required: "This field is required",
              maxLength: {
                value: 30,
                message: "Maximum 30 characters",
              },
            })}
          />

          <SelectCategory
            setCategory={setSelectedCategory}
            dontFilter
            label="Category"
          />

          <Popover>
            <p className="text-preset-5-bold relative -bottom-2 text-grey-500 dark:text-gray-300">
              Transaction Date
            </p>
            <PopoverTrigger asChild>
              <ButtonShadCn
                variant={"outline"}
                className={cn(
                  "h-[45px] w-full justify-start border border-beige-500 bg-transparent text-left font-normal dark:border-border dark:bg-grey-950",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </ButtonShadCn>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Input
            variant="basic"
            id="amount"
            label="Amount"
            inputMode="numeric"
            errors={errors.amount?.message ? true : false}
            errorMessage={errors.amount?.message as string}
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              input.value = input.value.replace(/(?!^-)[^0-9.]/g, "")
            }}
            {...register("amount", {
              required: "This field is required",
              pattern: {
                value: /^-?[0-9]+(\.[0-9]{1,2})?$/,
                message: "Only numbers are allowed",
              },
            })}
          />

          <div className="mt-3 flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={watch("recurring") || false}
              onCheckedChange={(checked) =>
                setValue("recurring", checked as boolean)
              }
            />
            <label
              htmlFor="recurring"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Recurring
            </label>
          </div>

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            variant="primary"
            label="Add Transaction"
            style={{ marginTop: "1.25rem" }}
          />
        </fieldset>
      </form>
    </article>
  )
}

export default AddTransactionModal
