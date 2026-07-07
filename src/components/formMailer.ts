// Odesílání formulářů přes FormSubmit.co (AJAX endpoint) – zdarma, bez měsíčního
// limitu a bez API klíčů ve frontendu. Web nemá backend, takže e-maily posílá
// FormSubmit; my jen děláme POST na jejich endpoint.
//
// DŮLEŽITÉ: první odeslaný formulář vyvolá aktivační e-mail od FormSubmit na
// adresu níže. Dokud se aktivace nepotvrdí kliknutím, zprávy se nedoručují.
export const FORM_TARGET_EMAIL = "prachyzaregistraci.cz@seznam.cz";

const ENDPOINT = `https://formsubmit.co/ajax/${FORM_TARGET_EMAIL}`;

// Název honeypot pole – FormSubmit odeslání s vyplněným `_honey` zahodí,
// my ho navíc zahodíme už na klientovi.
export const HONEYPOT_FIELD = "_honey";

export async function sendForm(
  subject: string,
  fields: Record<string, string>,
  attachment?: File | null
): Promise<boolean> {
  // Honeypot vyplní jen spam bot – tváříme se jako úspěch a nic neposíláme.
  if (fields[HONEYPOT_FIELD]?.trim()) return true;

  const body = new FormData();
  body.append("_subject", subject);
  body.append("_template", "table");
  body.append("_captcha", "false");
  for (const [key, value] of Object.entries(fields)) {
    if (key.startsWith("_")) continue;
    body.append(key, value.trim());
  }
  if (attachment) body.append("attachment", attachment);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body
    });
    if (!response.ok) return false;
    const data: unknown = await response.json();
    const success = (data as { success?: boolean | string }).success;
    return success === true || success === "true";
  } catch {
    return false;
  }
}
