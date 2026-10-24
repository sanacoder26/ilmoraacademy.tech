import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Chrome";
import { Journey, OnlineHow, FinalCta, SectionHead } from "@/components/site/Sections";

export const Route = createFileRoute("/how-it-works")({
  head: () => seo("How Online Quran Classes Work | IlmORA Academy", "From a free trial to regular live lessons: how IlmORA's one-to-one online Quran classes work and what you need.", "/how-it-works"),
  component: () => {
    const { t } = useI18n();
    return (
      <>
        <PageHero title={t.pages.how.title} sub={t.pages.how.sub} />
        <section className="container-x py-20"><SectionHead eyebrow={t.journey.eyebrow} title={t.journey.title} /><div className="mt-12"><Journey /></div></section>
        <section className="bg-secondary"><div className="container-x py-20"><SectionHead eyebrow={t.online.eyebrow} title={t.online.title} /><div className="mt-12"><OnlineHow /></div></div></section>
        <FinalCta />
      </>
    );
  },
});
