import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { en } from "@/lib/dict-en";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Chrome";
import { Faq, FinalCta } from "@/components/site/Sections";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...seo("FAQ — Online Quran Classes | IlmORA Academy", "Answers about free trials, scheduling, ages, Tajweed, Hifz, devices and enrolment.", "/faq"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: en.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }],
  }),
  component: () => {
    const { t } = useI18n();
    return (
      <>
        <PageHero title={t.pages.faq.title} sub={t.pages.faq.sub} />
        <section className="container-x py-20"><Faq /></section>
        <FinalCta />
      </>
    );
  },
});
