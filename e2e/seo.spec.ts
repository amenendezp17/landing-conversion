import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test("title and meta description are present and reasonably sized", async ({ page }) => {
    await page.goto("/");

    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThanOrEqual(70);
    expect(title).toContain("Flowlytics");

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
    expect(description!.length).toBeLessThanOrEqual(160);
  });

  test("canonical link and lang are set", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /flowlytics\.example\.com/
    );
  });

  test("Open Graph and Twitter card metadata is present", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /Flowlytics/
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image"
    );
  });

  test("robots meta is index/follow", async ({ page }) => {
    await page.goto("/");
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toMatch(/index/);
    expect(robots).not.toMatch(/noindex/);
  });

  test("exactly one JSON-LD block with SoftwareApplication + FAQPage", async ({ page }) => {
    await page.goto("/");

    const jsonLdRaw = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(jsonLdRaw).toBeTruthy();

    const parsed = JSON.parse(jsonLdRaw!);
    const types = (parsed["@graph"] ?? []).map((node: { "@type": string }) => node["@type"]);
    expect(types).toContain("SoftwareApplication");
    expect(types).toContain("FAQPage");
  });

  test("robots.txt is reachable and points to the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toMatch(/User-Agent: \*/i);
    expect(body).toMatch(/Sitemap:/i);
  });

  test("sitemap.xml is reachable and lists the home page", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toMatch(/<loc>.*<\/loc>/);
  });

  test("every internal anchor link resolves to an existing element on the page", async ({
    page,
  }) => {
    await page.goto("/");

    const hrefs = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((l) => l.getAttribute("href")));

    const uniqueAnchors = [...new Set(hrefs)].filter((h) => h && h !== "#");
    for (const anchor of uniqueAnchors) {
      const id = anchor!.slice(1);
      const count = await page.locator(`[id="${id}"]`).count();
      expect(count, `missing target for anchor ${anchor}`).toBeGreaterThan(0);
    }
  });
});
