import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Chrome";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms and Conditions | IlmORA Academy", "Terms for using the IlmORA Academy website and online Quran lessons.", "/terms"),
  component: () => {
    const { t } = useI18n();
    return (
      <>
        <PageHero title={t.pages.terms.title} />
        <section className="container-x max-w-3xl space-y-5 py-16 text-muted-foreground">{t.pages.terms.body.map((p) => <p key={p}>{p}</p>)}</section>
      </>
    );
  },
});
