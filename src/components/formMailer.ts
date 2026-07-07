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

export type SendFormResult = "sent" | "rate-limited" | "failed";

export const RATE_LIMIT_MESSAGE = "Příliš mnoho odeslání za sebou. Počkej prosím pár minut a zkus to znovu.";

// Odeslání textového formuláře bez přílohy (JSON zvládá diakritiku).
export async function sendForm(subject: string, fields: Record<string, string>): Promise<SendFormResult> {
  // Honeypot vyplní jen spam bot – tváříme se jako úspěch a nic neposíláme.
  if (fields[HONEYPOT_FIELD]?.trim()) return "sent";

  try {
    const payload: Record<string, string> = { _subject: subject, _captcha: "false" };
    for (const [key, value] of Object.entries(fields)) {
      if (key.startsWith("_")) continue;
      payload[key] = value.trim();
    }
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.status === 429) return "rate-limited";
    if (!response.ok) return "failed";
    return isSuccess(await response.json()) ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

// Odeslání formuláře s přílohou. AJAX endpoint FormSubmitu přílohy tiše
// zahazuje (e-mail dorazí bez souboru), proto skládáme klasický POST formulář
// a posíláme ho s přesměrováním zpět na web přes `_next`. Stránka se přitom
// znovu načte – stav „odesláno“ si volající předává v query parametru.
export function submitWithAttachment(
  subject: string,
  fields: Record<string, string>,
  fileInput: HTMLInputElement,
  nextUrl: string
): boolean {
  if (fields[HONEYPOT_FIELD]?.trim()) return false;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${FORM_TARGET_EMAIL}`;
  form.enctype = "multipart/form-data";
  form.style.display = "none";

  const add = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };
  add("_subject", toAscii(subject));
  add("_captcha", "false");
  add("_next", nextUrl);
  for (const [key, value] of Object.entries(fields)) {
    if (key.startsWith("_")) continue;
    add(toAscii(key), toAscii(value.trim()));
  }

  // Vybraný soubor nejde do inputu vložit programově – přesuneme celý input.
  fileInput.name = "attachment";
  form.appendChild(fileInput);
  document.body.appendChild(form);
  form.submit();
  return true;
}
