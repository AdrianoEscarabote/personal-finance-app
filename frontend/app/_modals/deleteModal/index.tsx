import { useState } from "react"

import Button from "@/app/_components/button"
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

import { DeleteModalProps } from "./deleteModalProps"

const DeleteModal = ({
  title,
  description,
  onCancel,
  onConfirm,
}: DeleteModalProps) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = () => {
    setLoading(true)
    onConfirm()
  }

  return (
    <article className="max-w-[35rem] rounded-xl bg-white">
      <div className="mb-4 flex items-center justify-between">
        <DialogTitle asChild>
          <h3 className="text-preset-1 text-grey-900">Delete ‘{title}’?</h3>
        </DialogTitle>
      </div>
      <DialogDescription asChild>
        <p className="text-preset-4 mb-4 text-grey-500">{description}</p>
      </DialogDescription>

      <div className="mt-5 flex flex-col gap-5">
        <Button
          variant="destroy"
          label="Yes, Confirm Deletion"
          loading={loading}
          disabled={loading}
          onClick={handleDelete}
        />
        <DialogClose asChild>
          <Button variant="tertiary" label="No, Go Back" onClick={onCancel} />
        </DialogClose>
      </div>
    </article>
  )
}

export default DeleteModal
