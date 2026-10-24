import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { en } from "@/lib/dict-en";
import { seo } from "@/lib/seo";
import { COURSE_SLUGS, type CourseSlug } from "@/lib/site";
import { PageHero } from "@/components/site/Chrome";
import { TrialForm } from "@/components/site/TrialForm";

export const Route = createFileRoute("/courses/$slug")({
  beforeLoad: ({ params }) => {
    if (!COURSE_SLUGS.includes(params.slug as CourseSlug)) throw notFound();
  },
  head: ({ params }) => {
    const c = en.courses[params.slug as CourseSlug];
    return c ? seo(`${c.title} Online | IlmORA Academy`, c.short + " Live one-to-one online lessons.", `/courses/${params.slug}`) : {};
  },
  component: Course,
});

function Course() {
  const { slug } = Route.useParams();
  const { t } = useI18n();
  const c = t.courses[slug as CourseSlug];
  return (
    <>
      <PageHero title={c.title} sub={c.short} />
      <section className="container-x grid gap-14 py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-lg text-muted-foreground">{c.body}</p>
          <dl className="mt-10 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
            <div><dt className="eyebrow">{t.coursesSec.ages}</dt><dd className="mt-2 text-primary">{c.ages}</dd></div>
            <div><dt className="eyebrow">{t.coursesSec.level}</dt><dd className="mt-2 text-primary">{c.level}</dd></div>
          </dl>
          <h2 className="mt-10 text-2xl font-semibold text-primary">{t.coursesSec.outcomes}</h2>
          <ul className="mt-5 space-y-3">{c.outcomes.map((o) => <li key={o} className="flex gap-3"><Check className="size-5 text-gold" />{o}</li>)}</ul>
          <Link to="/courses" className="mt-10 inline-block text-sm font-semibold text-primary hover:text-gold">← {t.nav.allCourses}</Link>
        </div>
        <div className="border border-border bg-card p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-primary">{t.nav.book}</h2>
          <TrialForm key={slug} defaultCourse={slug} />
        </div>
      </section>
    </>
  );
}
