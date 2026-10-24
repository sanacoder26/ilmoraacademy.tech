// Central pricing configuration for IlmORA Academy.
// Update fees, currencies, discounts and payment options here only.

export type Currency = "USD" | "GBP" | "PKR";

export const CURRENCIES: Record<Currency, { symbol: string; label: string }> = {
  USD: { symbol: "$", label: "USD ($)" },
  GBP: { symbol: "£", label: "GBP (£)" },
  PKR: { symbol: "Rs", label: "PKR (Rs)" },
};

export const CURRENCY_ORDER: Currency[] = ["USD", "GBP", "PKR"];

export type IntlPlanKey = "basic" | "standard" | "regular" | "intensive";
export type LocalPlanKey = "local3" | "local5";

export interface IntlPlan {
  key: IntlPlanKey;
  classesPerWeek: number;
  minutesPerClass: number;
  usd: [number, number];
  gbp: [number, number];
}

export interface LocalPlan {
  key: LocalPlanKey;
  classesPerWeek: number;
  minutesPerClass: number;
  pkr: [number, number];
}

export const INTL_PLANS: IntlPlan[] = [
  { key: "basic", classesPerWeek: 2, minutesPerClass: 30, usd: [30, 35], gbp: [25, 30] },
  { key: "standard", classesPerWeek: 3, minutesPerClass: 30, usd: [45, 50], gbp: [35, 40] },
  { key: "regular", classesPerWeek: 4, minutesPerClass: 30, usd: [60, 65], gbp: [45, 50] },
  { key: "intensive", classesPerWeek: 5, minutesPerClass: 30, usd: [75, 80], gbp: [55, 60] },
];

export const LOCAL_PLANS: LocalPlan[] = [
  { key: "local3", classesPerWeek: 3, minutesPerClass: 30, pkr: [3000, 3500] },
  { key: "local5", classesPerWeek: 5, minutesPerClass: 30, pkr: [4500, 5000] },
];

// Conditional family discount on the second child's fee (percent).
export const FAMILY_DISCOUNT = { min: 15, max: 20 };

// Potential payment methods — subject to availability and owner confirmation.
export const PAYMENT_METHODS = ["Wise", "Payoneer", "Remitly", "Western Union"] as const;

const fmt = (n: number) => n.toLocaleString("en-US");

/** Format a price range for display, e.g. "$30–$35", "£25–£30", "Rs 3,000–3,500". */
export function formatRange(range: [number, number], currency: Currency): string {
  const { symbol } = CURRENCIES[currency];
  const [lo, hi] = range;
  if (currency === "PKR") return `${symbol} ${fmt(lo)}–${fmt(hi)}`;
  return `${symbol}${fmt(lo)}–${symbol}${fmt(hi)}`;
}

/** Price range for an international plan in the selected currency, or null for PKR. */
export function intlPrice(plan: IntlPlan, currency: Currency): string | null {
  if (currency === "USD") return formatRange(plan.usd, "USD");
  if (currency === "GBP") return formatRange(plan.gbp, "GBP");
  return null;
}
