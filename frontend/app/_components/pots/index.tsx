import { useSelector } from "react-redux"

import IconPot from "@/app/_icons/icon-pot"
import { RootState } from "@/redux/reduxTypes"

import Button from "../button"

const Pots = () => {
  const pots = useSelector(
    (rootState: RootState) => rootState.financeSlice.pots,
  )

  const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0)
  return (
    <article>
      <div className="w-full rounded-xl bg-white px-5 py-6 dark:border dark:border-border dark:bg-grey-950 md:p-8 lg:max-w-[38rem]">
        <div className="items-cener flex justify-between">
          <h3 className="text-preset-2 mb-5 text-grey-900 dark:text-grey-100">
            Pots
          </h3>
          <Button
            variant="tertiary"
            style={{ maxWidth: "6.125rem", maxHeight: "1.3125rem" }}
            showIcon
            href="/pots"
            label="See Details"
          />
        </div>

        <div className="flex w-full flex-col gap-5 sm:max-h-[6.875rem] sm:flex-row">
          <div className="flex w-full items-center gap-4 rounded-xl bg-beige-100 p-4 dark:bg-grey-975 sm:max-w-[15.4375rem]">
            <IconPot className="text-green" />
            <p className="text-preset-4 flex flex-col gap-2 text-grey-500 dark:text-grey-300">
              Total Saved
              <span className="text-preset-1 text-grey-900 dark:text-grey-100">
                ${totalSaved}
              </span>
            </p>
          </div>

          <div className="grid w-full grid-cols-2 flex-wrap gap-3 sm:h-[2.6875rem] sm:max-w-[22.3125rem] md:flex lg:max-w-[17.3125rem]">
            {pots.slice(0, 4).map((pot) => (
              <div
                key={pot.name}
                className="flex w-full items-center gap-4 md:max-w-[170px] lg:max-w-[130px]"
              >
                <div
                  style={{ backgroundColor: pot.theme }}
                  className={`h-[2.6875rem] w-1 rounded-lg`}
                ></div>
                <p className="text-preset-5 flex flex-col gap-1 text-grey-500 dark:text-grey-300">
                  {pot.name}
                  <span className="text-preset-4-bold text-grey-900 dark:text-grey-100">
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
