import { describe, expect, it } from "vitest";
import { COURSE_SLUGS } from "@/lib/site";

describe("Qaida course selection", () => {
  it("offers Madani Qaida in place of the removed course", () => {
    expect(COURSE_SLUGS).toContain("madani-qaida");
    expect(COURSE_SLUGS).not.toContain("noorani-qaida");
  });
});