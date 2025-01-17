import Image from "next/image"
import { addModalProps } from "./addModalProps"
import Button from "@/app/_components/button"

const AddModal = ({ title, description, textButton }: addModalProps) => {
  return (
    <div>
      <article className="rounded-xl bg-white p-8 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-1 text-grey-900">{title}</h3>
          <button className="rounded-full">
            <Image
              src={"/images/icon-close-modal.svg"}
              alt=""
              width={32}
              height={32}
            />
          </button>
        </div>
        <p className="text-preset-4 mb-5 text-grey-500">{description}</p>

        <Button variant="primary" label={textButton} className="mt-5" />
      </article>
    </div>
  )
}

export default AddModal
