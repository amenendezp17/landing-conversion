import { test, expect, type Locator, type Page } from "@playwright/test";
import { PLANS } from "../lib/data";

// Reveal (framer-motion whileInView) animates each card's wrapper in on
// scroll. A one-shot boundingBox() right after navigation can be read
// mid-transition and produce a flaky y/height. Poll until two consecutive
// reads agree before trusting the measurement.
async function stableBox(locator: Locator) {
  let prev = await locator.boundingBox();
  for (let i = 0; i < 30; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const curr = await locator.boundingBox();
    if (
      prev &&
      curr &&
      Math.abs(prev.y - curr.y) < 0.5 &&
      Math.abs(prev.height - curr.height) < 0.5 &&
      Math.abs(prev.x - curr.x) < 0.5
    ) {
      return curr;
    }
    prev = curr;
  }
  return prev;
}

async function stablePlanBoxes(page: Page) {
  const boxes = [];
  for (const plan of PLANS) {
    const box = await stableBox(page.getByTestId(`plan-card-${plan.name}`));
    expect(box, `no bounding box for plan ${plan.name}`).not.toBeNull();
    boxes.push(box!);
  }
  return boxes;
}

test.describe("Responsive — mobile-first pricing", () => {
  test("pricing cards stack into a single column on mobile, no clipping", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/#pricing");
    await page.waitForLoadState("networkidle");
    await expect(page.getByTestId("plan-card-Empresa")).toBeVisible();

    const boxes = await stablePlanBoxes(page);

    // Same horizontal position (stacked column) and none clipped off-screen.
    const firstX = Math.round(boxes[0].x);
    for (const box of boxes) {
      expect(Math.round(box.x)).toBe(firstX);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(375 + 1);
    }

    // Stacked vertically in plan order, not overlapping.
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].y).toBeGreaterThan(boxes[i - 1].y + boxes[i - 1].height - 1);
    }
  });

  test("desktop shows the 3 plans side by side", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/#pricing");
    await page.waitForLoadState("networkidle");
    await expect(page.getByTestId("plan-card-Empresa")).toBeVisible();

    const boxes = await stablePlanBoxes(page);

    // All three roughly on the same row (small y delta), different x positions.
    const ys = boxes.map((b) => b.y);
    expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(40);

    const xs = boxes.map((b) => Math.round(b.x));
    expect(new Set(xs).size).toBe(3);
  });

  test("no horizontal overflow at common breakpoints", async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(width + 1);
    }
  });
});
