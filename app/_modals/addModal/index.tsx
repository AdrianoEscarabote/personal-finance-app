import Image from "next/image"
import { addModalProps } from "./addModalProps"
import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import SelectCategory from "@/app/_components/selectCategory"
import ColorTag from "@/app/_components/colorTag"

const AddModal = ({
  title,
  description,
  textButton,
  showBudgetCategory,
  showPotName,
  showMaximumSpend,
  showTarget,
}: addModalProps) => {
  return (
    <div>
      <article className="max-w-[560px] rounded-xl bg-white p-8 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-1 text-grey-900">{title}</h3>
          <button className="rounded-full">
            <Image
              src={"/images/icon-close-modal.svg"}
              alt=""
              width={30}
              height={30}
            />
          </button>
        </div>
        <p className="text-preset-4 mb-5 text-grey-500">{description}</p>

        <div className="flex w-full flex-col gap-4">
          {showPotName && (
            <Input
              variant="basic"
              errors={false}
              id="name"
              label="Pot Name"
              name="name"
              showCaracterLeft
            />
          )}

          {showBudgetCategory && <SelectCategory label="Budget Category" />}

          {showMaximumSpend && (
            <Input
              label="Maximum Spend"
              variant="withPrefix"
              errors={false}
              id="maximum"
              name="maximum"
            />
          )}

          {showTarget && (
            <Input
              label="Target"
              variant="withPrefix"
              errors={false}
              id="target"
              name="target"
            />
          )}

          <ColorTag label="Theme" />
        </div>

        <Button
          variant="primary"
          label={textButton}
          style={{ marginTop: "20px" }}
        />
      </article>
    </div>
  )
}

export default AddModal
