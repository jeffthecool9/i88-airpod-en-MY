export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    email,
    password,
    phone,
    fullName,
    agreedToTerms,
    turnstileToken,
  } = req.body;

  if (!turnstileToken) {
    return res.status(400).json({ message: "Missing verification token." });
  }

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    }
  );

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return res.status(400).json({
      message: "Bot verification failed.",
      errors: verifyData["error-codes"] || [],
    });
  }

  return res.status(200).json({ success: true });
}
