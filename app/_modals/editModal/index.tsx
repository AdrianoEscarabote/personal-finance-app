import Image from "next/image"
import Button from "@/app/_components/button"
import ColorTag from "@/app/_components/colorTag"
import SelectCategory from "@/app/_components/selectCategory"
import Input from "@/app/_components/input"
import { EditModalProps } from "./editModalProps"

const EditModal = ({
  title,
  description,
  showPotName,
  showbudgetCategory,
  closeModal,
}: EditModalProps) => {
  return (
    <div
      onClick={closeModal}
      className={`fixed left-0 top-0 z-40 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 p-5`}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[35rem] rounded-xl bg-white p-5 shadow-md transition-transform duration-300 lg:p-8`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-1 text-grey-900">{title}</h3>
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
          style={{ marginTop: "1.25rem" }}
        />
      </article>
    </div>
  )
}

export default EditModal
