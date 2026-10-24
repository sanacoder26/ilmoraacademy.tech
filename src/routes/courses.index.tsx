import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Chrome";
import { CoursesGrid, FinalCta } from "@/components/site/Sections";

export const Route = createFileRoute("/courses/")({
  head: () => seo("Online Quran Courses — Tajweed, Hifz, Qaida | IlmORA", "Madani Qaida, Quran with Tajweed, Hifz, recitation, Islamic studies and Quran classes for adults — taught live online.", "/courses"),
  component: () => {
    const { t } = useI18n();
    return (
      <>
        <PageHero title={t.pages.courses.title} sub={t.pages.courses.sub} />
        <section className="container-x py-20"><CoursesGrid /></section>
        <FinalCta />
      </>
    );
  },
});
