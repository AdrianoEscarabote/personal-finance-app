import { expect, test } from "@playwright/test"

test("user can add a new Pot from AddModal", async ({ page }) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.waitForURL("/")

  await page.getByRole("link", { name: /pots/i }).click()

  await page.click('[data-testid="add-new-pot-btn"]')

  await expect(
    page.getByText(
      "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
    ),
  ).toBeVisible()

  await page.fill('[data-testid="pot-name-input"]', "Viagem 2025")
  await page.fill('[data-testid="target-input"]', "2000")

  await page.click("button:has-text('Add Pot')")

  await expect(page.getByText("Viagem 2025")).toBeVisible()
})

test("user can add money to pot with addMoneyModal", async ({ page }) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.waitForURL("/")

  await page.getByRole("link", { name: /pots/i }).click()

  await page.locator('button:has-text("+ Add Money")').nth(0).click()

  await expect(
    page.getByText(
      "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.",
    ),
  ).toBeVisible()

  await page.fill('[data-testid="amount_input"]', "125")

  await page.click("button:has-text('Confirm Addition')")

  await expect(page.getByText("Total Saved: $284.00")).toBeVisible()
})

test("user can withdraw money from pot with withdrawMoneyModal", async ({
  page,
}) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.waitForURL("/")

  await page.getByRole("link", { name: /pots/i }).click()

  await page.locator('button:has-text("Withdraw")').nth(0).click()

  await expect(
    page.getByText(
      "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.",
    ),
  ).toBeVisible()

  await page.fill('[data-testid="withdraw-amount-input"]', "99")

  await page.click("button:has-text('Confirm Withdrawal')")

  await expect(page.getByText("Total Saved: $60.00")).toBeVisible()
})

test("user can edit pot with EditModal", async ({ page }) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.waitForURL("/")

  await page.getByRole("link", { name: /pots/i }).click()

  await page.locator('[data-testid="ellipsis_button"]').first().click()

  await page.click('button:has-text("Edit Pot")')

  await expect(
    page.getByText(
      "If your saving targets change, feel free to update your pots.",
    ),
  ).toBeVisible()

  await page.fill('[data-testid="input-pot-name"]', "Viagem 2025")
  await page.fill('[data-testid="input-maximum-spend"]', "2000")

  await page.click("button:has-text('Save Changes')")

  await expect(page.getByText("Viagem 2025")).toBeVisible()
})

test("user can delete pot with DeleteModal", async ({ page }) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.waitForURL("/")

  await page.getByRole("link", { name: /pots/i }).click()

  await page.locator('[data-testid="ellipsis_button"]').first().click()

  await page.click('button:has-text("Delete Pot")')

  await expect(page.getByText("Delete ‘Savings’?")).toBeVisible()

  await page.click('button:has-text("Yes, Confirm Deletion")')

  await expect(page.getByText("Savings")).not.toBeVisible()
})
