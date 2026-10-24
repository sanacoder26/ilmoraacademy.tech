// FormSubmit can return a failure in a successful HTTP response.
export async function submissionAccepted(response: Response, endpoint: string): Promise<boolean> {
  if (!response.ok) return false;
  if (!endpoint.startsWith("https://formsubmit.co/ajax/")) return true;
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("success" in result)) return false;
  return result.success === true || result.success === "true";
}