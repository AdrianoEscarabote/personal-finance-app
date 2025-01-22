import IconPot from "@/app/_icons/icon-pot"
import { RootState } from "@/redux/reduxTypes"
import { useSelector } from "react-redux"
import Button from "../button"

const Pots = () => {
  const pots = useSelector(
    (rootState: RootState) => rootState.financeSlice.pots,
  )

  const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0)
  return (
    <article>
      <div className="max-w-[38rem] rounded-xl bg-white p-8">
        <div className="items-cener flex justify-between">
          <h3 className="text-preset-2 mb-5 text-grey-900">Pots</h3>
          <Button
            variant="tertiary"
            style={{ maxWidth: "6.125rem", maxHeight: "1.3125rem" }}
            showIcon
            href="/pots"
            label="See Details"
          />
        </div>

        <div className="flex max-h-[6.875rem] w-full flex-wrap gap-5">
          <div className="flex w-full max-w-[15.4375rem] items-center gap-4 rounded-xl bg-beige-100 p-4">
            <IconPot className="text-green" />
            <p className="text-preset-4 flex flex-col gap-2 text-grey-500">
              Total Saved
              <span className="text-preset-1 text-grey-900">${totalSaved}</span>
            </p>
          </div>

          <div className="flex h-[2.6875rem] max-w-[17.3125rem] flex-wrap gap-3">
            {pots.slice(0, 4).map((pot) => (
              <div
                key={pot.name}
                className="flex w-full max-w-[8.125rem] items-center gap-4"
              >
                <div
                  style={{ backgroundColor: pot.theme }}
                  className={`h-[2.6875rem] w-1 rounded-lg`}
                ></div>
                <p className="text-preset-5 flex flex-col gap-1 text-grey-500">
                  {pot.name}
                  <span className="text-preset-4-bold text-grey-900">
                    ${pot.total}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default Pots
