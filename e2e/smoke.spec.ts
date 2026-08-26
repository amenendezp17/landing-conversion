import { test, expect } from "@playwright/test";

test.describe("Smoke path", () => {
  test("home loads with 200 and core landmarks", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Flowlytics/);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#features")).toBeAttached();
    await expect(page.locator("#pricing")).toBeAttached();
    await expect(page.locator("#faq")).toBeAttached();
    await expect(page.locator("#cta")).toBeAttached();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("critical conversion path: hero CTA -> form -> success", async ({ page }) => {
    // Mock Formspree so the smoke path doesn't depend on a real external service.
    await page.route("https://formspree.io/**", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/");

    await page.getByTestId("hero-cta").click();
    await expect(page).toHaveURL(/#cta$/);

    const emailInput = page.getByTestId("cta-email-input");
    await expect(emailInput).toBeVisible();
    await emailInput.fill("smoke-test@example.com");
    await page.getByTestId("cta-submit").click();

    await expect(page.getByTestId("cta-success")).toBeVisible();
  });

  test("no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(errors, `Unexpected console errors:\n${errors.join("\n")}`).toEqual([]);
  });
});
