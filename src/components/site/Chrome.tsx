import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ChevronDown, Menu, X, Mail, Phone, MessageCircle } from "lucide-react";
import emblem from "@/assets/ilmora-emblem.png.asset.json";
import logo from "@/assets/ilmora-logo.png.asset.json";
import { useI18n } from "@/lib/i18n";
import { COURSE_SLUGS, SITE, whatsappLink } from "@/lib/site";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`flex items-center text-sm ${className}`} role="group" aria-label="Language">
      <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`px-2 py-1 ${lang === "en" ? "font-semibold text-gold" : "opacity-70 hover:opacity-100"}`}>EN</button>
      <span className="opacity-40">/</span>
      <button onClick={() => setLang("ar")} aria-pressed={lang === "ar"} className={`px-2 py-1 ${lang === "ar" ? "font-semibold text-gold" : "opacity-70 hover:opacity-100"}`}>العربية</button>
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="IlmORA Academy — home">
      <img src={emblem.url} alt="" width={48} height={38} className="h-10 w-auto" />
      <span className="flex flex-col leading-none" dir="ltr">
        <span className="font-display text-2xl font-bold text-primary">
          Ilm<span className="text-gold">ORA</span>
        </span>
        <span className="text-[0.6rem] tracking-[0.35em] text-primary">ACADEMY</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/about", label: t.nav.about },
    { to: "/how-it-works", label: t.nav.how },
    { to: "/pricing", label: t.nav.pricing },
    { to: "/faq", label: t.nav.faq },
    { to: "/contact", label: t.nav.contact },
  ] as const;
  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-3 py-2 text-center text-sm">
          <span>{t.announce}</span>
          <Link to="/book-trial" className="font-semibold text-gold underline-offset-4 hover:underline">{t.announceCta} →</Link>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-x flex h-20 items-center justify-between gap-6">
          <Brand />
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Main">
            <div className="group relative">
              <Link to="/courses" className="flex items-center gap-1 py-2 hover:text-gold" activeProps={{ className: "text-gold" }}>
                {t.nav.courses} <ChevronDown className="size-4" />
              </Link>
              <div className="invisible absolute start-0 top-full w-72 border border-border bg-card p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {COURSE_SLUGS.map((s) => (
                  <Link key={s} to="/courses/$slug" params={{ slug: s }} className="block px-3 py-2 hover:bg-muted">{t.courses[s].title}</Link>
                ))}
              </div>
            </div>
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-gold" activeProps={{ className: "text-gold" }}>{l.label}</Link>
            ))}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <LangSwitch />
            <Link to="/book-trial" className="btn-navy">{t.nav.book}</Link>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? t.nav.close : t.nav.menu}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-border bg-background lg:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col py-4 text-base" onClick={() => setOpen(false)}>
              <Link to="/" className="py-2.5">{t.nav.home}</Link>
              <Link to="/courses" className="py-2.5">{t.nav.courses}</Link>
              {links.map((l) => <Link key={l.to} to={l.to} className="py-2.5">{l.label}</Link>)}
              <Link to="/book-trial" className="btn-navy mt-3">{t.nav.book}</Link>
            </div>
            <div className="container-x pb-4"><LangSwitch /></div>
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer() {
  const { t } = useI18n();
  const wa = whatsappLink();
  const hasContact = SITE.email || SITE.phone || wa;
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="inline-block rounded-sm bg-background p-3"><img src={logo.url} alt="IlmORA Academy logo" width={160} height={138} loading="lazy" className="h-24 w-auto" /></div>
          <p className="mt-4 text-sm opacity-80">{t.footer.about}</p>
        </div>
        <FooterCol title={t.footer.explore}>
          <Link to="/about">{t.nav.about}</Link>
          <Link to="/how-it-works">{t.nav.how}</Link>
          <Link to="/pricing">{t.nav.pricing}</Link>
          <Link to="/faq">{t.nav.faq}</Link>
          <Link to="/book-trial">{t.nav.book}</Link>
        </FooterCol>
        <FooterCol title={t.footer.courses}>
          {COURSE_SLUGS.map((s) => <Link key={s} to="/courses/$slug" params={{ slug: s }}>{t.courses[s].title}</Link>)}
        </FooterCol>
        <FooterCol title={t.footer.contact}>
          {SITE.email && <a href={`mailto:${SITE.email}`} className="flex items-center gap-2"><Mail className="size-4" />{SITE.email}</a>}
          {SITE.phone && <a href={`tel:${SITE.phone}`} className="flex items-center gap-2" dir="ltr"><Phone className="size-4" />{SITE.phone}</a>}
          {wa && <a href={wa} className="flex items-center gap-2"><MessageCircle className="size-4" />WhatsApp</a>}
          {!hasContact && <p className="opacity-70">{t.footer.contactSoon}</p>}
          <Link to="/contact">{t.nav.contact}</Link>
          <div className="mt-3"><span className="text-xs uppercase tracking-widest opacity-60">{t.footer.language}</span><LangSwitch className="-ms-2" /></div>
        </FooterCol>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-xs opacity-75">
          <span>© {new Date().getFullYear()} IlmORA Academy. {t.footer.rights}</span>
          <span className="flex gap-5"><Link to="/privacy">{t.footer.privacy}</Link><Link to="/terms">{t.footer.terms}</Link></span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg text-gold">{title}</h3>
      <div className="mt-4 flex flex-col gap-2.5 text-sm [&_a]:opacity-85 [&_a:hover]:text-gold [&_a:hover]:opacity-100">{children}</div>
    </div>
  );
}

export function PageHero({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="container-x py-16 md:py-20">
        <div className="h-px w-16 bg-gold" />
        <h1 className="mt-6 text-4xl font-semibold text-primary md:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}
