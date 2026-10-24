import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { SITE, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/site/Chrome";
import { TrialForm } from "@/components/site/TrialForm";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact IlmORA Academy", "Get in touch with IlmORA Academy about online Quran classes for your family.", "/contact"),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const c = t.pages.contact;
  const wa = whatsappLink();
  const any = SITE.email || SITE.phone || wa;
  return (
    <>
      <PageHero title={c.title} sub={c.sub} />
      <section className="container-x grid gap-14 py-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          {SITE.email && <a href={`mailto:${SITE.email}`} className="flex gap-3"><Mail className="text-gold" /><span><b className="block text-primary">{c.email}</b>{SITE.email}</span></a>}
          {SITE.phone && <a href={`tel:${SITE.phone}`} className="flex gap-3"><Phone className="text-gold" /><span><b className="block text-primary">{c.phone}</b><span dir="ltr">{SITE.phone}</span></span></a>}
          {wa && <a href={wa} className="btn-gold">{<MessageCircle className="size-4" />}{c.chat}</a>}
          {!any && <p className="border-s-2 border-gold bg-card p-5 text-muted-foreground">{c.none}</p>}
        </div>
        <div className="border border-border bg-card p-6 md:p-8"><TrialForm /></div>
      </section>
    </>
  );
}
