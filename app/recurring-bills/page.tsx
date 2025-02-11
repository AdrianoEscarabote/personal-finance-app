import RecurringBillsTable from "./_components/recurringBillsTable"
import Summary from "./_components/summary"
import TotalBills from "./_components/totalBills"

const RecurringPage = () => {
  return (
    <main className="w-full bg-beige-100">
      <div className="w-full px-10 py-8">
        <h1 className="text-preset-1 mb-8 text-grey-900">Recurring Bills</h1>
        <div className="flex w-full items-start justify-start gap-6">
          <div className="flex w-full max-w-[21.0625rem] flex-col items-center gap-6">
            <TotalBills />
            <Summary />
          </div>

          <RecurringBillsTable />
        </div>
      </div>
    </main>
  )
}

export default RecurringPage
