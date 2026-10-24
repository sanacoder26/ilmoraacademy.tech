import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Chrome";
import { TrialForm } from "@/components/site/TrialForm";

export const Route = createFileRoute("/book-trial")({
  head: () => seo("Book a Free Trial Quran Class | IlmORA Academy", "Request a free introductory online Quran class for your child or yourself, scheduled in your time zone.", "/book-trial"),
  component: () => {
    const { t } = useI18n();
    return (
      <>
        <PageHero title={t.pages.book.title} sub={t.pages.book.sub} />
        <section className="container-x py-16"><div className="mx-auto max-w-3xl border border-border bg-card p-6 md:p-10"><TrialForm /></div></section>
      </>
    );
  },
});
