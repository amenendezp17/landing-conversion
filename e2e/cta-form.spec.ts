import { test, expect } from "@playwright/test";

test.describe("CTA form — positive", () => {
  test("valid email submits and shows success without leaving the page", async ({ page }) => {
    await page.route("https://formspree.io/**", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/#cta");
    await page.getByTestId("cta-email-input").fill("lead@example.com");
    await page.getByTestId("cta-submit").click();

    await expect(page.getByTestId("cta-success")).toBeVisible();
    await expect(page).toHaveURL(/#cta$/); // still on the same page/anchor, no navigation
  });

  test("submit button shows a loading state while the request is in flight", async ({
    page,
  }) => {
    await page.route("https://formspree.io/**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/#cta");
    await page.getByTestId("cta-email-input").fill("lead@example.com");
    await page.getByTestId("cta-submit").click();

    await expect(page.getByTestId("cta-submit")).toBeDisabled();
    await expect(page.getByTestId("cta-submit")).toHaveText(/Enviando/);
    await expect(page.getByTestId("cta-success")).toBeVisible();
  });
});

test.describe("CTA form — negative", () => {
  test("empty submit is blocked by required-field validation", async ({ page }) => {
    let requestFired = false;
    await page.route("https://formspree.io/**", async (route) => {
      requestFired = true;
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });

    await page.goto("/#cta");
    await page.getByTestId("cta-submit").click();

    // Native HTML5 required validation should prevent submission entirely.
    await expect(page.getByTestId("cta-success")).toHaveCount(0);
    expect(requestFired).toBe(false);

    const isValid = await page
      .getByTestId("cta-email-input")
      .evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);
  });

  test("malformed email is blocked by type=email validation", async ({ page }) => {
    await page.goto("/#cta");
    await page.getByTestId("cta-email-input").fill("not-an-email");
    await page.getByTestId("cta-submit").click();

    await expect(page.getByTestId("cta-success")).toHaveCount(0);
    const validity = await page
      .getByTestId("cta-email-input")
      .evaluate((el: HTMLInputElement) => el.validity.typeMismatch);
    expect(validity).toBe(true);
  });

  test("server/network failure shows an inline error, not a silent failure or crash", async ({
    page,
  }) => {
    await page.route("https://formspree.io/**", async (route) => {
      await route.fulfill({ status: 500, contentType: "application/json", body: "{}" });
    });

    await page.goto("/#cta");
    await page.getByTestId("cta-email-input").fill("lead@example.com");
    await page.getByTestId("cta-submit").click();

    await expect(page.getByTestId("cta-error")).toBeVisible();
    await expect(page.getByTestId("cta-success")).toHaveCount(0);
    // Form must still be usable for a retry.
    await expect(page.getByTestId("cta-form")).toBeVisible();
    await expect(page.getByTestId("cta-submit")).toBeEnabled();
  });

  test("aborted network request shows an inline error", async ({ page }) => {
    await page.route("https://formspree.io/**", (route) => route.abort("failed"));

    await page.goto("/#cta");
    await page.getByTestId("cta-email-input").fill("lead@example.com");
    await page.getByTestId("cta-submit").click();

    await expect(page.getByTestId("cta-error")).toBeVisible();
  });
});
