-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_financeId_fkey";

-- DropForeignKey
ALTER TABLE "Budgets" DROP CONSTRAINT "Budgets_financeId_fkey";

-- DropForeignKey
ALTER TABLE "Pots" DROP CONSTRAINT "Pots_financeId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_financeId_fkey";

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "current" SET DEFAULT 0,
ALTER COLUMN "income" SET DEFAULT 0,
ALTER COLUMN "expenses" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Pots" ALTER COLUMN "total" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pots" ADD CONSTRAINT "Pots_financeId_fkey" FOREIGN KEY ("financeId") REFERENCES "Finance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
