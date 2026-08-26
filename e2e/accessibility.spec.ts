import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("WCAG 2.1 A/AA — automated audit (axe-core)", () => {
  test("home page has no detectable WCAG 2.1 A/AA violations", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2)
    ).toEqual([]);
  });

  test("pricing section in annual state has no violations (dynamic content)", async ({
    page,
  }) => {
    await page.goto("/#pricing");
    await page.getByTestId("billing-annual").click();
    await expect(page.getByTestId("discount-Pro")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include("#pricing")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("FAQ accordion in open state has no violations", async ({ page }) => {
    await page.goto("/#faq");
    await page.getByTestId("faq-trigger-2").click();

    const results = await new AxeBuilder({ page })
      .include("#faq")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("CTA form error state has no violations", async ({ page }) => {
    await page.route("https://formspree.io/**", async (route) => {
      await route.fulfill({ status: 500, contentType: "application/json", body: "{}" });
    });
    await page.goto("/#cta");
    await page.getByTestId("cta-email-input").fill("lead@example.com");
    await page.getByTestId("cta-submit").click();
    await expect(page.getByTestId("cta-error")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include("#cta")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});

test.describe("Manual WCAG checks not fully covered by axe", () => {
  test("page has exactly one h1 and no skipped heading levels", async ({ page }) => {
    await page.goto("/");

    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    const levels = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((el) =>
        Number(el.tagName[1])
      )
    );
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test("skip link lets keyboard users bypass the header", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Saltar al contenido" });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);
  });

  test("document language is set", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });
});
