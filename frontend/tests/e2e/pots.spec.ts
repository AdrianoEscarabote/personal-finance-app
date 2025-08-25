// tests/e2e/add-modal.spec.ts
import { /* expect, */ expect, test } from "@playwright/test"

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
