import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import learning from "@/assets/learning.jpg";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { CoursesGrid, Journey, OnlineHow, Testimonials, Faq, FinalCta, SectionHead } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo(
      "IlmORA Academy — Online Quran Classes for Kids & Adults",
      "Live one-to-one online Quran classes with Tajweed, Hifz, Madani Qaida and Islamic studies for families in the UK, USA, Canada and worldwide.",
      "/",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "EducationalOrganization", name: SITE.name, url: SITE.url, slogan: "Illuminating Hearts with the Light of Quran" }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep text-primary-foreground">

        <div className="container-x relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] md:text-6xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg opacity-85">{t.hero.sub}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/book-trial" className="btn-gold">{t.hero.cta} <ArrowRight className="size-4 rtl:rotate-180" /></Link>
              <Link to="/courses" className="btn-line">{t.hero.cta2}</Link>
            </div>
            <p className="mt-10 font-display text-xl text-gold-soft" dir="rtl" lang="ar">نضيء القلوب بنور القرآن</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 border border-gold/50" aria-hidden />
            <img src={hero} alt={t.hero.imgAlt} width={1600} height={1104} className="relative aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-x py-16">
          <h2 className="sr-only">{t.trust.title}</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.items.map((it) => (
              <div key={it.t}>
                <div className="h-px w-10 bg-gold" />
                <h3 className="mt-4 text-xl font-semibold text-primary">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={t.coursesSec.eyebrow} title={t.coursesSec.title} sub={t.coursesSec.sub} />
        <div className="mt-12"><CoursesGrid /></div>
      </section>

      <section className="bg-secondary">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
          <img src={learning} alt="A young student following Arabic letters in a beginner reading book" width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div>
            <SectionHead eyebrow={t.why.eyebrow} title={t.why.title} />
            <ul className="mt-8 space-y-5">
              {t.why.items.map((it) => (
                <li key={it.t} className="flex gap-4">
                  <span className="mt-2 size-2 shrink-0 rotate-45 bg-gold" />
                  <div><h3 className="text-lg font-semibold text-primary">{it.t}</h3><p className="text-sm text-muted-foreground">{it.d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHead eyebrow={t.journey.eyebrow} title={t.journey.title} />
        <div className="mt-12"><Journey /></div>
      </section>


      <section className="container-x grid gap-16 py-20 lg:grid-cols-2">
        <div><SectionHead eyebrow={t.online.eyebrow} title={t.online.title} /><div className="mt-10"><OnlineHow /></div></div>
        <div><SectionHead eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} /><div className="mt-10"><Testimonials /></div></div>
      </section>

      <section className="container-x pb-20">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="mt-10"><Faq limit={5} /></div>
        <Link to="/faq" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:text-gold">{t.nav.faq} <ArrowRight className="size-4 rtl:rotate-180" /></Link>
      </section>

      <FinalCta />
    </>
  );
}
