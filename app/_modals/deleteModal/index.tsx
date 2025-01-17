import Image from "next/image"
import { DeleteModalProps } from "./deleteModalProps"
import Button from "@/app/_components/button"

const DeleteModal = ({
  title,
  description,
  onCancel,
  onConfirm,
}: DeleteModalProps) => {
  return (
    <div>
      <article className="rounded-xl bg-white p-8 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-1 text-grey-900">{title}</h3>
          <button className="rounded-full" onClick={onCancel}>
            <Image
              src={"/images/icon-close-modal.svg"}
              alt=""
              width={32}
              height={32}
            />
          </button>
        </div>
        <p className="text-preset-4 mb-5 text-grey-500">{description}</p>

        <div className="flex flex-col gap-5">
          <Button
            variant="destroy"
            label="Yes, Confirm Deletion"
            onClick={onConfirm}
            className="mt-5"
          />
          <Button
            variant="tertiary"
            label="No, Go Back"
            onClick={onCancel}
            className="mt-5"
          />
        </div>
      </article>
    </div>
  )
}

export default DeleteModal
