import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Gift, Wallet } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";
import {
  CURRENCIES,
  CURRENCY_ORDER,
  INTL_PLANS,
  LOCAL_PLANS,
  PAYMENT_METHODS,
  formatRange,
  intlPrice,
  type Currency,
} from "@/lib/pricing";
import { PageHero, SectionHead } from "@/components/site/Chrome";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    ...seo(
      "Pricing & Plans — IlmORA Academy",
      "Affordable monthly Quran learning plans for every family. International plans in USD and GBP, local plans in PKR for students in Pakistan, plus a 3-day free trial.",
      "/pricing",
    ),
  }),
  component: PricingPage,
});

const Arrow = () => <ArrowRight className="size-4 rtl:rotate-180" />;

function CurrencySwitch({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  const { t } = useI18n();
  return (
    <div className="mt-8 inline-flex flex-wrap items-center gap-2 border border-border bg-card p-1.5" role="group" aria-label={t.pricing.currencyLabel}>
      <span className="px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.pricing.currencyLabel}</span>
      {CURRENCY_ORDER.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          aria-pressed={value === c}
          className={`px-4 py-2 text-sm font-semibold transition ${value === c ? "bg-primary text-primary-foreground" : "text-primary hover:bg-muted"}`}
        >
          {CURRENCIES[c].label}
        </button>
      ))}
    </div>
  );
}

function PlanCard({
  name,
  desc,
  price,
  classesPerWeek,
  minutesPerClass,
  featured,
}: {
  name: string;
  desc: string;
  price: string;
  classesPerWeek: number;
  minutesPerClass: number;
  featured?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className={`flex flex-col bg-card p-8 ${featured ? "border-2 border-gold shadow-lg" : "border border-border"}`}>
      <h3 className="font-display text-2xl font-semibold text-primary">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <p className="mt-6">
        <span className="font-display text-3xl font-bold text-primary" dir="ltr">{price}</span>{" "}
        <span className="text-sm text-muted-foreground">{t.pricing.perMonth}</span>
      </p>
      <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm text-muted-foreground">
        <li className="flex items-center gap-2.5">
          <CalendarDays className="size-4 shrink-0 text-gold" />
          {classesPerWeek} {t.pricing.classesWeek}
        </li>
        <li className="flex items-center gap-2.5">
          <Clock3 className="size-4 shrink-0 text-gold" />
          {minutesPerClass} {t.pricing.minutesClass}
        </li>
      </ul>
      <div className="mt-8 flex flex-col gap-3">
        <Link to="/book-trial" className="btn-gold">{t.pricing.startTrial}</Link>
        <Link to="/book-trial" className="btn-line text-primary">{t.pricing.choosePlan}</Link>
      </div>
    </div>
  );
}

function PricingPage() {
  const { t } = useI18n();
  const [currency, setCurrency] = useState<Currency>("USD");
  const isPkr = currency === "PKR";
  const wa = whatsappLink(t.pricing.familyTitle);

  const intlSection = (
    <section className="container-x py-16">
      <SectionHead title={t.pricing.intlTitle} sub={t.pricing.intlSub} />
      {isPkr ? (
        <p className="mt-8 max-w-2xl border-s-2 border-gold bg-card p-5 text-sm text-muted-foreground">{t.pricing.pkrNote}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTL_PLANS.map((p) => (
            <PlanCard
              key={p.key}
              name={t.pricing.plans[p.key].name}
              desc={t.pricing.plans[p.key].desc}
              price={intlPrice(p, currency) ?? ""}
              classesPerWeek={p.classesPerWeek}
              minutesPerClass={p.minutesPerClass}
              featured={p.key === "standard"}
            />
          ))}
        </div>
      )}
    </section>
  );

  const localSection = (
    <section className={isPkr ? "container-x py-16" : "bg-secondary"}>
      <div className={isPkr ? "" : "container-x py-16"}>
        <SectionHead title={t.pricing.localTitle} sub={t.pricing.localSub} />
        {isPkr ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {LOCAL_PLANS.map((p) => (
              <PlanCard
                key={p.key}
                name={t.pricing.plans[p.key].name}
                desc={t.pricing.plans[p.key].desc}
                price={formatRange(p.pkr, "PKR")}
                classesPerWeek={p.classesPerWeek}
                minutesPerClass={p.minutesPerClass}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-2xl border-s-2 border-gold bg-card p-5 text-sm text-muted-foreground">{t.pricing.intlNote}</p>
        )}
      </div>
    </section>
  );

  return (
    <>
      <PageHero title={t.pricing.title} sub={t.pricing.sub} />

      <div className="container-x">
        <CurrencySwitch value={currency} onChange={setCurrency} />
      </div>

      {isPkr ? (
        <>
          {localSection}
          {intlSection}
        </>
      ) : (
        <>
          {intlSection}
          {localSection}
        </>
      )}

      <section className="bg-primary text-primary-foreground">
        <div className="container-x flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold md:text-4xl">{t.pricing.trialTitle}</h2>
            <p className="mt-3 opacity-85">{t.pricing.trialSub}</p>
            <p className="mt-3 text-sm text-gold-soft">{t.pricing.noRegFee}</p>
          </div>
          <Link to="/book-trial" className="btn-gold">{t.pricing.trialCta} <Arrow /></Link>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <div className="border border-border bg-card p-8">
          <Gift className="size-8 text-gold" strokeWidth={1.25} />
          <h2 className="mt-4 font-display text-3xl font-semibold text-primary">{t.pricing.familyTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.pricing.familyBody}</p>
          <p className="mt-3 text-sm text-muted-foreground">{t.pricing.familyNote}</p>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-navy mt-6">{t.pricing.familyCta} <Arrow /></a>
          ) : (
            <Link to="/contact" className="btn-navy mt-6">{t.pricing.familyCta} <Arrow /></Link>
          )}
        </div>
        <div className="border border-border bg-card p-8">
          <Wallet className="size-8 text-gold" strokeWidth={1.25} />
          <h2 className="mt-4 font-display text-3xl font-semibold text-primary">{t.pricing.payTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.pricing.payBody}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {PAYMENT_METHODS.map((m) => (
              <li key={m} className="border border-border bg-secondary px-4 py-2 text-sm font-medium text-primary">{m}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">{t.pricing.payNote}</p>
        </div>
      </section>
    </>
  );
}
