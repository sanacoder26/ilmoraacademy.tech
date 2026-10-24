import { describe, expect, it } from "vitest";

import {
  CURRENCY_ORDER,
  FAMILY_DISCOUNT,
  INTL_PLANS,
  LOCAL_PLANS,
  formatRange,
  intlPrice,
} from "@/lib/pricing";

describe("Pricing configuration", () => {
  it("offers exactly the USD, GBP and PKR currencies", () => {
    expect(CURRENCY_ORDER).toEqual(["USD", "GBP", "PKR"]);
  });

  it("has four international plans with the exact owner-provided USD and GBP ranges", () => {
    expect(INTL_PLANS.map((p) => [p.key, p.classesPerWeek, p.minutesPerClass, p.usd, p.gbp])).toEqual([
      ["basic", 2, 30, [30, 35], [25, 30]],
      ["standard", 3, 30, [45, 50], [35, 40]],
      ["regular", 4, 30, [60, 65], [45, 50]],
      ["intensive", 5, 30, [75, 80], [55, 60]],
    ]);
  });

  it("has two Pakistan local plans with the exact PKR ranges", () => {
    expect(LOCAL_PLANS.map((p) => [p.key, p.classesPerWeek, p.minutesPerClass, p.pkr])).toEqual([
      ["local3", 3, 30, [3000, 3500]],
      ["local5", 5, 30, [4500, 5000]],
    ]);
  });

  it("keeps the family discount conditional at 15%–20% on the second child", () => {
    expect(FAMILY_DISCOUNT).toEqual({ min: 15, max: 20 });
  });

  it("formats price ranges without inventing conversions", () => {
    expect(formatRange([30, 35], "USD")).toBe("$30–$35");
    expect(formatRange([25, 30], "GBP")).toBe("£25–£30");
    expect(formatRange([3000, 3500], "PKR")).toBe("Rs 3,000–3,500");
  });

  it("shows international plan prices only in USD or GBP, never converted to PKR", () => {
    const standard = INTL_PLANS.find((p) => p.key === "standard")!;
    expect(intlPrice(standard, "USD")).toBe("$45–$50");
    expect(intlPrice(standard, "GBP")).toBe("£35–£40");
    expect(intlPrice(standard, "PKR")).toBeNull();
  });
});
