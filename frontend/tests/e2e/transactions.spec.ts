import { expect, test } from "@playwright/test"

test("user can add a new transaction with AddTransaction modal", async ({
  page,
}) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.waitForURL("/")

  await page.getByRole("link", { name: /transactions/i }).click()

  await page.click('[data-testid="add-transaction-button"]')

  await expect(
    page.getByText(
      "Enter the details to add a new transaction and keep your finances up to date",
    ),
  ).toBeVisible()

  await page.fill('[data-testid="name-input"]', "Test Transaction")

  await page.click('[data-testid="select-category-btn"]')

  const option = page.getByRole("button", { name: "Transportation" })
  await expect(option).toBeVisible()
  await expect(option).toBeEnabled()
  await option.click()

  await page.fill('[data-testid="amount-input"]', "250")

  await page.click('button:has-text("Add Transaction")')

  await expect(page.getByText("Test Transaction")).toBeVisible()
})
