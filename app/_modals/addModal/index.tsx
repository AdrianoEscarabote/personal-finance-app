import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import Button from "@/app/_components/button"
import ColorTag from "@/app/_components/colorTag"
import Input from "@/app/_components/input"
import SelectCategory from "@/app/_components/selectCategory"
import useDemoFetch from "@/hooks/useDemoFetch"
import useEscClose from "@/hooks/useEscClose"
import { addBudget, addNewPot } from "@/redux/finance/reducer"

import { addModalProps } from "./addModalProps"

const AddModal = ({
  title,
  description,
  textButton,
  showBudgetCategory,
  showPotName,
  showMaximumSpend,
  showTarget,
  closeModal,
}: addModalProps) => {
  const dispatch = useDispatch()
  useEscClose(closeModal)
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const { register, handleSubmit, watch } = useForm()
  const { demoFetch, isDemoMode } = useDemoFetch()
  const demoMode = isDemoMode

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    if (title === "pot") {
      let pot_id = ""

      if (demoMode !== "true") {
        const response = await demoFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/finance/pots/add_pot`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              pot_name: data.pot_name,
              theme,
              target: data.target,
              total: 0,
            }),
          },
        )
        if (!response) {
          console.error("Failed to add new pot")
          return
        }

        const responseJson = await response.json()
        pot_id = responseJson.pot_id
      } else {
        pot_id = crypto.randomUUID()
      }

      dispatch(
        addNewPot({
          theme,
          total: 0,
          name: data.pot_name,
          target: data.target,
          pot_id,
        }),
      )
    }
    if (title === "budget") {
      let budget_id = ""

      if (demoMode !== "true") {
        const response = await demoFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/finance/budgets/add_budget`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              budget_name: selectedCategory,
              theme,
              budget_value: Number(data.maximum),
            }),
          },
        )

        if (!response) {
          console.error("Failed to add new budget")
          return
        }

        const responseJson = await response.json()
        budget_id = responseJson?.budget_id || ""
      } else {
        budget_id = crypto.randomUUID()
      }

      dispatch(
        addBudget({
          category: selectedCategory,
          theme,
          maximum: Number(data.maximum),
          budget_id,
        }),
      )
    }
    closeModal()
  })

  const potName = watch("pot_name", "")

  return (
    <div
      onClick={closeModal}
      className={`fixed left-0 top-0 z-40 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 p-5`}
    >
      <article
        className="w-full max-w-[560px] rounded-xl bg-white p-8 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={onSubmit}>
          <fieldset>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-preset-1 text-grey-900">
                Add New {title === "budget" ? " Budget" : "Pot"}
              </h3>
              <button onClick={closeModal} className="rounded-full">
                <Image
                  src={"/images/icon-close-modal.svg"}
                  alt=""
                  width={30}
                  height={30}
                />
              </button>
            </div>
            <p className="text-preset-4 mb-5 text-grey-500">
              {description === "budget" &&
                "Choose a category to set a spending budget. These categories can help you monitor spending."}
              {description === "pot" &&
                "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."}
            </p>

            <div className="flex w-full flex-col gap-4">
              {showPotName && (
                <Input
                  variant="basic"
                  errors={false}
                  id="name"
                  label="Pot Name"
                  maxLength={30}
                  showCaracterLeft
                  value={potName}
                  {...register("pot_name", {
                    required: "This field is required",
                    maxLength: {
                      value: 30,
                      message: "Máximo de 30 caracteres",
                    },
                  })}
                />
              )}

              {showBudgetCategory && (
                <SelectCategory
                  setCategory={setSelectedCategory}
                  label="Budget Category"
                />
              )}

              {showMaximumSpend && (
                <Input
                  label="Maximum Spend"
                  variant="withPrefix"
                  errors={false}
                  id="maximum"
                  {...register("maximum", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]{1,2})?$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
              )}

              {showTarget && (
                <Input
                  label="Target"
                  variant="withPrefix"
                  errors={false}
                  id="target"
                  {...register("target", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]+(\.[0-9]{1,2})?$/,
                      message: "Only numbers are allowed",
                    },
                  })}
                />
              )}

              <ColorTag label="Theme" setTheme={setTheme} />
            </div>

            <Button
              type="submit"
              variant="primary"
              label={textButton}
              loading={loading}
              disabled={loading}
              style={{ marginTop: "1.25rem" }}
            />
          </fieldset>
        </form>
      </article>
    </div>
  )
}

export default AddModal
