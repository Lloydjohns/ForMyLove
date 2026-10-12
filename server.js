import { createServer } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";

try {
  for (const line of readFileSync(new URL(".env", import.meta.url), "utf8").split(/\r?\n/)) {
    const entry = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (entry && process.env[entry[1]] === undefined) process.env[entry[1]] = entry[2].replace(/^(?:"(.*)"|'(.*)')$/, (_, doubleQuoted, singleQuoted) => doubleQuoted ?? singleQuoted);
  }
} catch { /* Environment variables can also be supplied by the host. */ }

const port = Number(process.env.PORT || 3001);
const secret = process.env.SESSION_SECRET;

function send(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
}

function issueToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 2 * 60 * 60 * 1000 })).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function validToken(token) {
  if (!secret || typeof token !== "string") return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = createHmac("sha256", secret).update(payload).digest();
  let actual;
  try { actual = Buffer.from(signature, "base64url"); } catch { return false; }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
  try { return JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Date.now(); } catch { return false; }
}

async function readBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 10_000) throw new Error("Request too large");
  }
  return JSON.parse(raw || "{}");
}

createServer(async (req, res) => {
  if (req.method !== "POST" || !["/api/verify-anniversary", "/api/send-message"].includes(req.url)) {
    return send(res, 404, { error: "Not found" });
  }
  try {
    const data = await readBody(req);
    if (req.url === "/api/verify-anniversary") {
      if (!process.env.ANNIVERSARY_DATE || !secret) return send(res, 503, { error: "Anniversary access is not configured yet." });
      if (data.date !== process.env.ANNIVERSARY_DATE) return send(res, 401, { error: "That date doesn't match our special day. Try again, love." });
      return send(res, 200, { token: issueToken() });
    }

    if (!validToken(req.headers.authorization?.replace(/^Bearer\s+/i, ""))) return send(res, 401, { error: "Please enter our anniversary date first." });
    const message = typeof data.message === "string" ? data.message.trim() : "";
    const sender = typeof data.name === "string" ? data.name.trim().slice(0, 80) : "Someone special";
    if (message.length < 5 || message.length > 4000) return send(res, 400, { error: "Please write a message between 5 and 4,000 characters." });
    const { RESEND_API_KEY, EMAIL_TO, EMAIL_FROM } = process.env;
    if (!RESEND_API_KEY || !EMAIL_TO || !EMAIL_FROM) return send(res, 503, { error: "Email delivery isn't configured yet." });

    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        subject: `A love note from ${sender}`,
        text: `From: ${sender}\nReceived: ${new Date().toISOString()}\n\n${message}`,
      }),
    });
    if (!result.ok) return send(res, 502, { error: "The note couldn't be delivered just now. Please try again." });
    return send(res, 200, { ok: true });
  } catch {
    return send(res, 400, { error: "Please check your message and try again." });
  }
}).listen(port, () => console.log(`Love letter API listening on ${port}`));
