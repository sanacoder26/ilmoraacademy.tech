import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Chrome";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy | IlmORA Academy", "How IlmORA Academy collects and uses the information you share with us.", "/privacy"),
  component: () => {
    const { t } = useI18n();
    return (
      <>
        <PageHero title={t.pages.privacy.title} />
        <section className="container-x max-w-3xl space-y-5 py-16 text-muted-foreground">{t.pages.privacy.body.map((p) => <p key={p}>{p}</p>)}</section>
      </>
    );
  },
});
