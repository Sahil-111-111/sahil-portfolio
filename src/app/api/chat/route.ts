import { NextResponse } from "next/server";
import { cv } from "@/data/cv";
import { localRespond } from "@/lib/localResponder";

const SYSTEM_CONTEXT = `
You are Sahil Dhabu's AI assistant speaking in the first person as Sahil (or clearly as Sahil's AI twin representing him).
Use ONLY the verified CV facts below. Never invent employers, projects, dates, skills, or metrics.
Vylos Finance dates are strictly "${cv.project.period}" — do not change or invent other years for Vylos.
Keep answers sharp, professional, and concise: 2–4 sentences unless the user asks for technical depth.
Tone: confident, clear, recruiter-friendly.

NAME: ${cv.name}
TITLE: ${cv.title}
LOCATION: ${cv.location}
PHONE: ${cv.phone}
EMAIL: ${cv.email}
LINKEDIN: ${cv.linkedin}
STATUS: ${cv.status}
STATEMENT: ${cv.personalStatement}

EXPERIENCE:
${cv.experience
  .map(
    (e) =>
      `- ${e.role} @ ${e.company} (${e.period})\n${e.bullets.map((b) => `  • ${b}`).join("\n")}`,
  )
  .join("\n")}

PROJECT:
${cv.project.name} — ${cv.project.tagline} (${cv.project.status}, ${cv.project.period})
${cv.project.description}
Tech: ${cv.project.techStack.join(", ")}
Architecture: ${cv.project.architecture.map((n) => `${n.code} ${n.title}: ${n.detail}`).join(" | ")}

EDUCATION:
${cv.education
  .map(
    (e) =>
      `- ${e.degree} @ ${e.institution} (${e.period}) [${e.status}] — ${e.details}`,
  )
  .join("\n")}

SKILLS:
${(Object.entries(cv.skills) as [string, readonly string[]][])
  .map(([k, v]) => `${k}: ${v.join(", ")}`)
  .join("\n")}
`.trim();

type Body = { message?: string };

async function tryGemini(message: string, apiKey: string): Promise<string | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_CONTEXT }] },
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 512,
      },
    }),
  });

  // Rate limit / API errors → silent local fallback
  if (res.status === 429 || !res.ok) {
    return null;
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim() ?? "";

  return text || null;
}

export async function POST(request: Request) {
  let message = "";
  try {
    const body = (await request.json()) as Body;
    message = (body.message ?? "").trim();
  } catch {
    // Still return a useful reply so the UI never surfaces a hard error
    return NextResponse.json({
      reply: localRespond("Tell me about yourself"),
      source: "local",
    });
  }

  if (!message) {
    return NextResponse.json({
      reply: localRespond("Tell me about yourself"),
      source: "local",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const geminiReply = await tryGemini(message, apiKey);
      if (geminiReply) {
        return NextResponse.json({ reply: geminiReply, source: "gemini" });
      }
    } catch {
      // Network / parse failures → silent local fallback
    }
  }

  return NextResponse.json({
    reply: localRespond(message),
    source: "local",
  });
}
