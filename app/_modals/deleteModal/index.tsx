import Image from "next/image"
import { DeleteModalProps } from "./deleteModalProps"
import Button from "@/app/_components/button"
import useEscClose from "@/hooks/useEscClose"

const DeleteModal = ({
  title,
  description,
  onCancel,
  onConfirm,
}: DeleteModalProps) => {
  useEscClose(onCancel)
  return (
    <div
      onClick={onCancel}
      className="fixed left-0 top-0 z-40 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="max-w-[35rem] rounded-xl bg-white p-8 shadow-md"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-1 text-grey-900">Delete ‘{title}’?</h3>
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

        <div className="mt-5 flex flex-col gap-5">
          <Button
            variant="destroy"
            label="Yes, Confirm Deletion"
            onClick={onConfirm}
          />
          <Button variant="tertiary" label="No, Go Back" onClick={onCancel} />
        </div>
      </article>
    </div>
  )
}

export default DeleteModal
