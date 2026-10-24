import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { COURSE_SLUGS, SITE } from "@/lib/site";
import { submissionAccepted } from "@/lib/form-submit";

type Status = "idle" | "sending" | "success" | "error" | "notConnected";
const REQUIRED = ["name", "email", "phone", "country", "timezone", "age", "course", "days", "method"] as const;

export function TrialForm({ defaultCourse = "" }: { defaultCourse?: string }) {
  const { t } = useI18n();
  const f = t.form;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const tz = "America/New_York";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs: Record<string, string> = {};
    for (const k of REQUIRED) if (!data[k]?.trim()) errs[k] = f.required;
    if (data["email"] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data["email"])) errs["email"] = f.invalidEmail;
    if (data["phone"] && !/^\+\d[\d\s-]{6,}$/.test(data["phone"].trim())) errs["phone"] = f.invalidPhone;
    if (!data["consent"]) errs["consent"] = f.consentReq;
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (!SITE.bookingEndpoint) return setStatus("notConnected");
    setStatus("sending");
    try {
      const res = await fetch(SITE.bookingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const accepted = await submissionAccepted(res, SITE.bookingEndpoint);
      setStatus(accepted ? "success" : "error");
      if (accepted) form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field = (name: string, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={`f-${name}`} className="mb-1.5 block text-sm font-medium text-primary">{label}</label>
      {el}
      {errors[name] && <p id={`e-${name}`} className="mt-1 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );
  const a = (name: string) => ({ id: `f-${name}`, name, "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `e-${name}` : undefined, className: "field" });

  if (status === "success")
    return <div role="status" className="border-s-2 border-gold bg-card p-8 text-lg text-primary">{f.success}</div>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {field("name", f.name, <input {...a("name")} autoComplete="name" />)}
      {field("email", f.email, <input {...a("email")} type="email" autoComplete="email" dir="ltr" />)}
      {field("phone", f.phone, <input {...a("phone")} type="tel" placeholder="+44 7…" autoComplete="tel" dir="ltr" />)}
      {field("country", f.country, <input {...a("country")} autoComplete="country-name" />)}
      {field("timezone", f.timezone, <input {...a("timezone")} defaultValue={tz} dir="ltr" />)}
      {field("age", f.age, <select {...a("age")} defaultValue=""><option value="" disabled>{f.select}</option>{f.ages.map((x) => <option key={x}>{x}</option>)}</select>)}
      {field("course", f.course, <select {...a("course")} defaultValue={defaultCourse}><option value="" disabled>{f.select}</option>{COURSE_SLUGS.map((s) => <option key={s} value={s}>{t.courses[s].title}</option>)}</select>)}
      {field("method", f.method, <select {...a("method")} defaultValue=""><option value="" disabled>{f.select}</option>{f.methods.map((x) => <option key={x}>{x}</option>)}</select>)}
      <div className="sm:col-span-2">{field("days", f.days, <input {...a("days")} placeholder={f.daysPh} />)}</div>
      <div className="sm:col-span-2">{field("message", f.message, <textarea {...a("message")} rows={4} />)}</div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input id="f-consent" name="consent" type="checkbox" className="mt-1 size-4 accent-primary" aria-invalid={!!errors["consent"]} />
          <span>{f.consent} <Link to="/privacy" className="text-primary underline">{t.footer.privacy}</Link></span>
        </label>
        {errors["consent"] && <p className="mt-1 text-sm text-destructive">{errors["consent"]}</p>}
      </div>
      <div className="sm:col-span-2" aria-live="polite">
        {status === "error" && <p className="mb-3 text-destructive">{f.error}</p>}
        {status === "notConnected" && <p className="mb-3 border-s-2 border-gold bg-muted p-3 text-sm text-primary">{f.notConnected}</p>}
        <button type="submit" disabled={status === "sending"} className="btn-navy w-full sm:w-auto">{status === "sending" ? f.sending : f.submit}</button>
      </div>
    </form>
  );
}
