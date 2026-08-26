import { test } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";

// Runs against the production build served by the Playwright webServer.
// Performance thresholds are kept lenient: this executes on a shared/sandboxed
// machine, not representative prod hardware, so perf numbers are noisy.
// Accessibility/SEO/best-practices are deterministic and kept strict.
test.describe("Lighthouse audit", () => {
  test("home page meets quality thresholds", async ({ page }) => {
    await page.goto("/");

    await playAudit({
      page,
      port: 9222,
      thresholds: {
        performance: 60,
        accessibility: 95,
        "best-practices": 90,
        seo: 95,
      },
      reports: {
        formats: { html: true },
        name: "lighthouse-report",
        directory: "./lighthouse-reports",
      },
    });
  });
});
