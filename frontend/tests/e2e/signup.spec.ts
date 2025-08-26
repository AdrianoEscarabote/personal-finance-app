import { expect, test } from "@playwright/test"

test("user can signup successfully", async ({ page }) => {
  await page.goto("/signup")

  const uniqueEmail = `user${Date.now()}@test.com`

  await page.getByTestId("name-input").fill("Test User")
  await page.getByTestId("email-input").fill(uniqueEmail)
  await page.getByTestId("password-input").fill("testpassword123")

  await page.locator('button:has-text("Create Account")').click()

  await expect(page).toHaveURL("/")

  await expect(page.getByText("Current Balance")).toBeVisible()
})
