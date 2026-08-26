import { test, expect } from "@playwright/test";
import { PLANS } from "../lib/data";

function expectedDiscount(monthly: number, annual: number) {
  return Math.round((1 - annual / (monthly * 12)) * 100);
}

test.describe("Pricing toggle — positive", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#pricing");
  });

  test("defaults to monthly pricing with no discount shown", async ({ page }) => {
    await expect(page.getByTestId("billing-monthly")).toHaveAttribute("aria-pressed", "true");

    for (const plan of PLANS) {
      await expect(page.getByTestId(`price-${plan.name}`)).toContainText(`€${plan.monthly}`);
      await expect(page.getByTestId(`price-${plan.name}`)).toContainText("/mes");
      // Discount note must not exist in the a11y tree while on monthly billing.
      await expect(page.getByTestId(`discount-${plan.name}`)).toHaveCount(0);
    }
  });

  test("switching to annual recalculates every plan's price and live discount", async ({
    page,
  }) => {
    await page.getByTestId("billing-annual").click();
    await expect(page.getByTestId("billing-annual")).toHaveAttribute("aria-pressed", "true");

    for (const plan of PLANS) {
      const priceBlock = page.getByTestId(`price-${plan.name}`);
      await expect(priceBlock).toContainText(`€${plan.annual}`);
      await expect(priceBlock).toContainText("/año");

      const discount = expectedDiscount(plan.monthly, plan.annual);
      await expect(page.getByTestId(`discount-${plan.name}`)).toContainText(`${discount}%`);
    }
  });

  test("price animates rather than jumping instantly", async ({ page }) => {
    const proPrice = page.getByTestId("price-Pro");
    await expect(proPrice).toContainText("€29");

    await page.getByTestId("billing-annual").click();

    // Immediately after the click the animated value should not yet be the
    // final €290 — framer-motion tweens it over ~0.6s.
    const immediateText = await proPrice.textContent();
    expect(immediateText).not.toContain("€290");

    await expect(proPrice).toContainText("€290", { timeout: 2000 });
  });

  test("Pro plan is visually distinguished beyond a badge", async ({ page }) => {
    const proCard = page.getByTestId("plan-card-Pro");
    await expect(proCard.getByText("Más popular")).toBeVisible();

    const className = await proCard.getAttribute("class");
    // Must rely on more than the badge: border/shadow/scale accent classes.
    expect(className).toMatch(/border-indigo-400/);
    expect(className).toMatch(/shadow-2xl/);
  });

  test("toggling back to monthly hides the discount again", async ({ page }) => {
    await page.getByTestId("billing-annual").click();
    await expect(page.getByTestId("discount-Pro")).toBeVisible();

    await page.getByTestId("billing-monthly").click();
    await expect(page.getByTestId("discount-Pro")).toHaveCount(0);
    await expect(page.getByTestId("price-Pro")).toContainText("€29");
  });
});

test.describe("Pricing toggle — negative / edge cases", () => {
  test("rapid repeated toggling settles on the last selected state", async ({ page }) => {
    await page.goto("/#pricing");

    for (let i = 0; i < 5; i++) {
      await page.getByTestId("billing-annual").click();
      await page.getByTestId("billing-monthly").click();
    }
    await page.getByTestId("billing-annual").click();

    await expect(page.getByTestId("billing-annual")).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("price-Básico")).toContainText("€90", { timeout: 2000 });
  });

  test("all three plan CTAs point to the same #cta anchor, no dead links", async ({ page }) => {
    await page.goto("/#pricing");

    for (const plan of PLANS) {
      await expect(page.getByTestId(`plan-cta-${plan.name}`)).toHaveAttribute("href", "#cta");
    }
  });
});
