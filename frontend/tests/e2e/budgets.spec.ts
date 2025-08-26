import { expect, test } from "@playwright/test"

test("user can add a new budget from AddModal", async ({ page }) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.waitForURL("/")

  await page.getByRole("link", { name: /budgets/i }).click()

  await page.click('[data-testid="add-new-budget-btn"]')

  await expect(
    page.getByText(
      "Choose a category to set a spending budget. These categories can help you monitor spending.",
    ),
  ).toBeVisible()

  await page.click('[data-testid="select-category-btn"]')

  await page.click("button:has-text('Transportation')")

  await page.fill('[data-testid="maximum-input"]', "500")

  await page.click('[data-testid="color-tag-button"]')

  await page.click("button:has-text('Magenta')")

  await page.click("button:has-text('Add Budget')")

  await expect(page.getByText("Transportation").first()).toBeVisible()
  await expect(page.getByText("$105.25 of 500")).toBeVisible()
  await expect(page.getByText("Maximum of $500.00")).toBeVisible()
})

test("user can edit budget with EditModal", async ({ page }) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.getByRole("link", { name: /budgets/i }).click()

  await page.locator('[data-testid="budget-options-button"]').first().click()

  await page.click('button:has-text("Edit Budget")')

  await expect(
    page.getByText(
      "As your budgets change, feel free to update your spending limits.",
    ),
  ).toBeVisible()

  await page.click('[data-testid="select-category-btn"]')
  await page.click("button:has-text('Entertainment')")
  await page.fill('[data-testid="input-maximum-spend"]', "40")
  await page.click('[data-testid="color-tag-button"]')
  await page.click("button:has-text('Magenta')")

  await page.click("button:has-text('Save Changes')")

  await expect(page.getByText("Entertainment").first()).toBeVisible()
  await expect(page.getByText("$25 of 40")).toBeVisible()
  await expect(page.getByText("Maximum of $40.00")).toBeVisible()
})

test("user can delete budget with DeleteModal", async ({ page }) => {
  await page.goto("/login")

  await page.click("button:has-text('Demo Mode')")

  await page.getByRole("link", { name: /budgets/i }).click()

  await page.locator('[data-testid="budget-options-button"]').first().click()

  await page.click('button:has-text("Delete Budget")')

  await expect(page.getByText("Delete ‘Entertainment’?")).toBeVisible()

  await page.click('button:has-text("Yes, Confirm Deletion")')

  await expect(page.getByText("Entertainment")).not.toBeVisible()
})
