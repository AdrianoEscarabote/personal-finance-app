// tests/e2e/login.spec.ts
import { expect, test } from "@playwright/test"

test("user can login with valid credentials", async ({ page }) => {
  await page.goto("/login")

  await page.getByTestId("email-input").fill("demo@playwright.com")

  await page.getByTestId("password-input").fill("password")

  await page.getByRole("button", { name: /login/i }).click()

  await expect(page).toHaveURL("/")

  await expect(page.getByText("Current Balance")).toBeVisible()
})
