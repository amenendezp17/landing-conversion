import { test, expect } from "@playwright/test";

test.describe("FAQ accordion — positive", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#faq");
  });

  test("first question starts open, others closed", async ({ page }) => {
    await expect(page.getByTestId("faq-trigger-0")).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByTestId("faq-trigger-1")).toHaveAttribute("aria-expanded", "false");
  });

  test("clicking a closed question opens it and closes the previous one", async ({ page }) => {
    await page.getByTestId("faq-trigger-2").click();

    await expect(page.getByTestId("faq-trigger-2")).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByTestId("faq-panel-2")).toBeVisible();
    await expect(page.getByTestId("faq-trigger-0")).toHaveAttribute("aria-expanded", "false");
  });

  test("clicking an open question closes it (no item forced open)", async ({ page }) => {
    await page.getByTestId("faq-trigger-0").click();
    await expect(page.getByTestId("faq-trigger-0")).toHaveAttribute("aria-expanded", "false");

    const panel = page.getByTestId("faq-panel-0");
    await expect(panel).toHaveCSS("height", "0px");
  });

  test("panel height animates via auto-height, not display:none", async ({ page }) => {
    const panel = page.getByTestId("faq-panel-1");
    await expect(panel).toHaveCSS("display", "block");
    await expect(panel).toHaveCSS("height", "0px");

    await page.getByTestId("faq-trigger-1").click();

    await expect(async () => {
      const height = await panel.evaluate((el) => parseFloat(getComputedStyle(el).height));
      expect(height).toBeGreaterThan(0);
    }).toPass({ timeout: 1000 });

    // Still display:block (never display:none) throughout the transition/open state.
    await expect(panel).toHaveCSS("display", "block");
  });

  test("keyboard operable: Tab + Enter toggles the focused question", async ({ page }) => {
    const trigger = page.getByTestId("faq-trigger-1");
    await trigger.focus();
    await expect(trigger).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("FAQ accordion — negative / edge", () => {
  test("mashing the same trigger repeatedly leaves it in a consistent final state", async ({
    page,
  }) => {
    await page.goto("/#faq");
    const trigger = page.getByTestId("faq-trigger-3");

    for (let i = 0; i < 6; i++) {
      await trigger.click();
    }
    // 6 clicks (even) starting from closed -> ends closed.
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
