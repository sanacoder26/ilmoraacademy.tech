import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/ilmora-logo-full.png.asset.json";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Chrome";
import { FinalCta } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => seo("About IlmORA Academy — Knowledge and Light", "Learn about IlmORA Academy, an online Quran academy teaching children, adults and families worldwide.", "/about"),
  component: About,
});

function About() {
  const { t } = useI18n();
  const a = t.pages.about;
  return (
    <>
      <PageHero title={a.title} sub={a.sub} />
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1fr_1.2fr]">
        <img src={logo.url} alt="IlmORA Academy logo with tagline in English and Arabic" width={600} height={600} loading="lazy" className="mx-auto w-full max-w-sm" />
        <div className="space-y-5 text-lg text-muted-foreground"><p>{a.p1}</p><p>{a.p2}</p></div>
      </section>
      <section className="bg-secondary">
        <div className="container-x py-20">
          <h2 className="text-3xl font-semibold text-primary">{a.valuesTitle}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {a.values.map((v) => (
              <div key={v.t}><div className="h-px w-10 bg-gold" /><h3 className="mt-4 text-2xl text-primary">{v.t}</h3><p className="mt-2 text-muted-foreground">{v.d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
