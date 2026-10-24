// Central academy settings. Fill these in with the owner's verified details.
// Anything left empty is hidden from the site automatically.
export const SITE = {
  name: "IlmORA Academy",
  url: "https://ilmora.academy", // replace with the real domain once published
  email: "ilmoraacademy.tech@gmail.com",
  phone: "", // e.g. "+44 20 0000 0000"
  whatsapp: "923453302351", // owner-provided: 0345-3302351 (Pakistan) → +92 345 3302351
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  // Free FormSubmit forwarding; the owner must confirm the Gmail activation email.
  bookingEndpoint: (import.meta.env["VITE_BOOKING_ENDPOINT"] as string | undefined)?.trim() || "https://formsubmit.co/ajax/ilmoraacademy.tech@gmail.com",
};

export const whatsappLink = (text = "") =>
  SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : "";

export const COURSE_SLUGS = [
  "madani-qaida",
  "tajweed",
  "hifz",
  "recitation",
  "islamic-studies",
  "adults",
] as const;
export type CourseSlug = (typeof COURSE_SLUGS)[number];
