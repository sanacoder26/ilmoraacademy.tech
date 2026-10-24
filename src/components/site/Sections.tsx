import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarClock, Laptop, Users, MessageSquareQuote } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { COURSE_SLUGS } from "@/lib/site";
import { SectionHead } from "./Chrome";

const Arrow = () => <ArrowRight className="size-4 rtl:rotate-180" />;

export function CoursesGrid() {
  const { t } = useI18n();
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {COURSE_SLUGS.map((s, i) => (
        <Link key={s} to="/courses/$slug" params={{ slug: s }} className="group flex flex-col bg-card p-8 transition hover:bg-secondary">
          <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-2xl font-semibold text-primary">{t.courses[s].title}</h3>
          <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.courses[s].short}</p>
          <p className="mt-4 text-xs text-muted-foreground">{t.coursesSec.ages}: {t.courses[s].ages}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-gold">{t.coursesSec.more} <Arrow /></span>
        </Link>
      ))}
    </div>
  );
}

export function Journey() {
  const { t } = useI18n();
  return (
    <ol className="grid gap-8 md:grid-cols-4">
      {t.journey.steps.map((s, i) => (
        <li key={s.t} className="border-t-2 border-gold pt-5">
          <span className="font-display text-4xl text-gold">{i + 1}</span>
          <h3 className="mt-2 text-xl font-semibold text-primary">{s.t}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function OnlineHow() {
  const { t } = useI18n();
  const icons = [Users, CalendarClock, Laptop, BookOpen];
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {t.online.items.map((it, i) => {
        const I = icons[i] ?? BookOpen;
        return (
          <div key={it.t} className="flex gap-4">
            <I className="mt-1 size-6 shrink-0 text-gold" strokeWidth={1.5} />
            <div><h3 className="text-xl font-semibold text-primary">{it.t}</h3><p className="mt-1 text-sm text-muted-foreground">{it.d}</p></div>
          </div>
        );
      })}
    </div>
  );
}


export function Testimonials() {
  const { t } = useI18n();
  return (
    <div className="flex items-start gap-4 border-s-2 border-gold bg-card p-8">
      <MessageSquareQuote className="size-8 shrink-0 text-gold" strokeWidth={1.25} />
      <p className="text-muted-foreground">{t.testimonials.note}</p>
    </div>
  );
}

export function Faq({ limit }: { limit?: number }) {
  const { t } = useI18n();
  const items = limit ? t.faq.items.slice(0, limit) : t.faq.items;
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-primary">
            {f.q}<span className="text-2xl text-gold transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FinalCta() {
  const { t } = useI18n();
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-x flex flex-col items-start gap-6 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold md:text-4xl">{t.finalCta.title}</h2>
          <p className="mt-3 opacity-80">{t.finalCta.sub}</p>
        </div>
        <Link to="/book-trial" className="btn-gold">{t.hero.cta} <Arrow /></Link>
      </div>
    </section>
  );
}

export { SectionHead };
