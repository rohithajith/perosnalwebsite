export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Minimal edge-compatible handler: validate payload and return success.
    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body as { name?: string; email?: string; message?: string };

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // In production forward to your email provider or Formspree here.
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Contact POST error:", message);
    return new Response(JSON.stringify({ error: message || "Internal error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
