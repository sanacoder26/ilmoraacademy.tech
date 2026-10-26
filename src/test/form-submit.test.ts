import { describe, expect, it } from "vitest";
import { SITE } from "@/lib/site";
import { submissionAccepted } from "@/lib/form-submit";
import { en } from "@/lib/dict-en";
import { ar } from "@/lib/dict-ar";

describe("Free form email forwarding", () => {
  it("forwards to the owner's receiving Gmail address", () => {
    expect(SITE.bookingEndpoint).toBe("https://formsubmit.co/ajax/ilmoraacademy.tech@gmail.com");
  });

  it("offers email and WhatsApp without phone calls in both languages", () => {
    expect(en.form.methods).toEqual(["Email", "WhatsApp"]);
    expect(ar.form.methods).toEqual(["البريد الإلكتروني", "واتساب"]);
  });

  it("recognizes FormSubmit acceptance without claiming delivery", async () => {
    expect(await submissionAccepted(new Response('{"success":"true"}'), SITE.bookingEndpoint)).toBe(true);
  });

  it("rejects a provider failure even with HTTP 200", async () => {
    expect(await submissionAccepted(new Response('{"success":"false"}'), SITE.bookingEndpoint)).toBe(false);
  });

  it("rejects HTTP errors", async () => {
    expect(await submissionAccepted(new Response("Unavailable", { status: 503 }), SITE.bookingEndpoint)).toBe(false);
  });
});