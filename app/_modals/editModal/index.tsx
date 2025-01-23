import Button from "@/app/_components/button"
import { EditModalProps } from "./editModalProps"
import Image from "next/image"
import ColorTag from "@/app/_components/colorTag"
import SelectCategory from "@/app/_components/selectCategory"
import Input from "@/app/_components/input"

const EditModal = ({
  title,
  description,
  showPotName,
  showbudgetCategory,
}: EditModalProps) => {
  return (
    <div>
      <article className="w-full max-w-[560px] rounded-xl bg-white p-8 shadow-md">
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
          {showbudgetCategory && <SelectCategory label="Budget Category" />}

          <Input
            label="Maximum Spend"
            variant="withPrefix"
            errors={false}
            id="maximum"
            name="maximum"
          />

          <ColorTag label={"Theme"} />
        </div>

        <Button
          variant="primary"
          label="Save Changes"
          style={{ marginTop: "20px" }}
        />
      </article>
    </div>
  )
}

export default EditModal
