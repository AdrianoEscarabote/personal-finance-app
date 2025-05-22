import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import Button from "@/app/_components/button"
import ColorTag from "@/app/_components/colorTag"
import Input from "@/app/_components/input"
import SelectCategory from "@/app/_components/selectCategory"
import useDemoFetch from "@/hooks/useDemoFetch"
import useEscClose from "@/hooks/useEscClose"
import { editBudget, editPot } from "@/redux/finance/reducer"

import { EditModalProps } from "./editModalProps"

const EditModal = ({
  content,
  showPotName,
  showbudgetCategory,
  closeModal,
  data_edit_pot,
  data_edit_budget,
}: EditModalProps) => {
  const dispatch = useDispatch()
  useEscClose(closeModal)
  const [loading, setLoading] = useState(false)
  const { demoFetch } = useDemoFetch()
  const [theme, setTheme] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    if (content === "pot") {
      await demoFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/finance/pots/edit_pot`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pot_id: data_edit_pot?.pot_id,
            name: data.name,
            target: data.maximum,
            theme,
          }),
        },
      )
      dispatch(
        editPot({
          pot_name: data_edit_pot?.pot_name as string,
          new_pot_name: data.name,
          maximum_spend: data.maximum,
          theme,
        }),
      )
    }
    if (content === "budget") {
      await demoFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/finance/budgets/edit_budget`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            budget_id: data_edit_budget?.budget_id,
            budget_name: selectedCategory,
            budget_value: Number(data.maximum),
            theme,
          }),
        },
      )
      dispatch(
        editBudget({
          category: data_edit_budget?.budget_category as string,
          new_category: selectedCategory,
          maximum: Number(data.maximum),
          theme,
        }),
      )
    }
    closeModal()
  })

  useEffect(() => {
    if (data_edit_pot) {
      setValue("name", data_edit_pot.pot_name)
      setValue("maximum", data_edit_pot.target)
      setTheme(data_edit_pot.theme)
    }
    if (data_edit_budget) {
      setSelectedCategory(data_edit_budget.budget_category)
      setValue("maximum", Number(data_edit_budget.target))
      setTheme(data_edit_budget.theme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      onClick={closeModal}
      className={`fixed left-0 top-0 z-40 flex h-full min-h-screen w-full items-center justify-center overflow-y-scroll bg-black bg-opacity-50 p-5`}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[35rem] rounded-xl bg-white p-5 shadow-md transition-transform duration-300 lg:p-8`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-1 text-grey-900">
            Edit {content === "pot" ? "Pot" : "Budget"}
          </h3>
          <button
            className="rounded-full"
            onClick={closeModal}
            data-testid="close_modal_button"
          >
            <Image
              src={"/images/icon-close-modal.svg"}
              alt=""
              width={30}
              height={30}
            />
          </button>
        </div>
        <p className="text-preset-4 mb-5 text-grey-500">
          {content === "pot" &&
            "If your saving targets change, feel free to update your pots."}
          {content === "budget" &&
            "As your budgets change, feel free to update your spending limits."}
        </p>
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend className="sr-only">
              Enter your new pot details below to update your pot.
            </legend>
            <div className="flex w-full flex-col gap-4">
              {showPotName && (
                <Input
                  variant="basic"
                  id="name"
                  label="Pot Name"
                  showCaracterLeft
                  errors={errors.name?.message ? true : false}
                  errorMessage={errors.name?.message as string}
                  {...register("name", {
                    required: "This field is required.",
                  })}
                />
              )}
              {showbudgetCategory && (
                <SelectCategory
                  setCategory={setSelectedCategory}
                  category={data_edit_budget?.budget_category}
                  label="Budget Category"
                  dontFilter
                />
              )}
              <Input
                label="Maximum Spend"
                variant="withPrefix"
                id="maximum"
                errors={errors.maximum?.message ? true : false}
                errorMessage={errors.maximum?.message as string}
                {...register("maximum", {
                  required: "This field is required.",
                })}
              />
              <ColorTag setTheme={setTheme} label={"Theme"} dontFilter />
            </div>
            <Button
              variant="primary"
              type="submit"
              loading={loading}
              disabled={loading}
              label="Save Changes"
              style={{ marginTop: "1.25rem" }}
            />
          </fieldset>
        </form>
      </article>
    </div>
  )
}

export default EditModal
