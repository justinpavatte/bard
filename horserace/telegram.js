//dfy_horse_race_bot
//Public Token
const TELEGRAM_BOT_TOKEN = "8344279419:AAF5TP8CgKGJ0TesATlxQPUe5LUElNxs4b4";
const TELEGRAM_CHAT_ID = "7830815090";

export function isTelegramConfigured() {
  return (
    typeof TELEGRAM_BOT_TOKEN === "string" &&
    TELEGRAM_BOT_TOKEN.length > 10 &&
    !TELEGRAM_BOT_TOKEN.includes("PASTE") &&
    typeof TELEGRAM_CHAT_ID === "string" &&
    !TELEGRAM_CHAT_ID.includes("PASTE")
  );
}

/**
 * Send a Telegram message via Bot API.
 * This is a fire-and-forget client-side call (non-blocking).
 * If not configured, it will silently no-op.
 */
export async function sendTelegramMessage(text) {
  if (!isTelegramConfigured()) {
    // helpful debug log but not noisy
    console.debug("sendTelegramMessage: telegram not configured; skipping send:", text);
    return;
  }

  const base = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const params = new URLSearchParams({
    chat_id: TELEGRAM_CHAT_ID,
    text: text
  });

  try {
    await fetch(`${base}?${params.toString()}`, { method: "GET" });
  } catch (err) {
    console.warn("sendTelegramMessage: network error", err);
    // per spec: failures are non-fatal; DB is source of truth
  }
}
