// Odesílání formulářů přes FormSubmit.co (AJAX endpoint) – zdarma, bez měsíčního
// limitu a bez API klíčů ve frontendu. Web nemá backend, takže e-maily posílá
// FormSubmit; my jen děláme POST na jejich endpoint.
//
// POZOR na dvě ověřené záludnosti jejich API (červenec 2026):
// 1. Multipart/urlencoded tělo s jakýmkoli ne-ASCII znakem (česká diakritika)
//    vrací "Server Error". JSON tělo diakritiku zvládá. Proto bez přílohy
//    posíláme JSON a s přílohou multipart s textem přepsaným do ASCII.
// 2. Parametr `_template=table` shazuje server – neposílat.
export const FORM_TARGET_EMAIL = "prachyzaregistraci.cz@seznam.cz";

const ENDPOINT = `https://formsubmit.co/ajax/${FORM_TARGET_EMAIL}`;

// Název honeypot pole – FormSubmit odeslání s vyplněným `_honey` zahodí,
// my ho navíc zahodíme už na klientovi.
export const HONEYPOT_FIELD = "_honey";

// Přepis do ASCII: odstraní diakritiku, typografické znaky nahradí základními.
function toAscii(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[„“”]/g, '"')
    .replace(/[‚‘’]/g, "'")
    .replace(/…/g, "...")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7E]/g, "?");
}

function isSuccess(data: unknown) {
  const success = (data as { success?: boolean | string } | null)?.success;
  return success === true || success === "true";
}

export async function sendForm(
  subject: string,
  fields: Record<string, string>,
  attachment?: File | null
): Promise<boolean> {
  // Honeypot vyplní jen spam bot – tváříme se jako úspěch a nic neposíláme.
  if (fields[HONEYPOT_FIELD]?.trim()) return true;

  try {
    let response: Response;

    if (attachment) {
      const body = new FormData();
      body.append("_subject", toAscii(subject));
      body.append("_captcha", "false");
      for (const [key, value] of Object.entries(fields)) {
        if (key.startsWith("_")) continue;
        body.append(toAscii(key), toAscii(value.trim()));
      }
      const safeName = toAscii(attachment.name).replace(/[^\w.-]/g, "_") || "priloha";
      body.append("attachment", attachment, safeName);
      response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body
      });
    } else {
      const payload: Record<string, string> = { _subject: subject, _captcha: "false" };
      for (const [key, value] of Object.entries(fields)) {
        if (key.startsWith("_")) continue;
        payload[key] = value.trim();
      }
      response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) return false;
    return isSuccess(await response.json());
  } catch {
    return false;
  }
}
