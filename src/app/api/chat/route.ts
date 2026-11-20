import { NextResponse } from "next/server";
import { cv } from "@/data/cv";
import { getLocalFallbackResponse } from "@/lib/localResponder";

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

function okLocal(message: string) {
  return NextResponse.json(
    { reply: getLocalFallbackResponse(message), source: "local" },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  let message = "";

  try {
    const body = (await request.json()) as Body;
    message = (body.message ?? "").trim();
  } catch (err) {
    console.error("Gemini API fallback triggered:", err);
    return okLocal("Tell me about yourself");
  }

  if (!message) {
    return okLocal("Tell me about yourself");
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    console.error(
      "Gemini API fallback triggered:",
      "GEMINI_API_KEY missing or empty",
    );
    return okLocal(message);
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_CONTEXT }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.error(
        "Gemini API fallback triggered:",
        `HTTP ${response.status}`,
        errBody.slice(0, 500),
      );
      return okLocal(message);
    }

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    if (!text) {
      console.error(
        "Gemini API fallback triggered:",
        "Empty candidates[0].content.parts[0].text",
        JSON.stringify(data).slice(0, 500),
      );
      return okLocal(message);
    }

    return NextResponse.json(
      { reply: text, source: "gemini" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Gemini API fallback triggered:", err);
    return NextResponse.json(
      { reply: getLocalFallbackResponse(message), source: "local" },
      { status: 200 },
    );
  }
}
