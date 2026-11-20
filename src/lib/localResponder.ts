import { cv } from "@/data/cv";

function normalize(q: string) {
  return q.toLowerCase().replace(/[^\w\s+]/g, " ").replace(/\s+/g, " ").trim();
}

const shahina = cv.experience.find((e) => e.id === "shahina")!;
const vylos = cv.experience.find((e) => e.id === "vylos")!;

/** Case-insensitive keyword fallback grounded strictly in src/data/cv.ts */
export function getLocalFallbackResponse(message: string): string {
  const q = normalize(message);

  if (/(ollama|cost|infrastructure|self.?host|expensive|api.?call|reduc)/.test(q)) {
    return [
      `At Vylos Finance (${cv.project.period}), I optimized AI infrastructure costs by self-hosting LLM capabilities via Ollama on local hardware.`,
      `That reduced reliance on expensive third-party API calls while keeping Gemini API + RAG for grounded financial insights where accuracy matters most.`,
    ].join(" ");
  }

  if (/(rag|chatbot|gemini|architect|hallucin)/.test(q)) {
    return [
      `At Vylos Finance I built an AI chatbot using the Gemini API with Retrieval-Augmented Generation (RAG) to deliver contextual financial insights while minimizing hallucination.`,
      `Queries flow Client Interface → Hybrid AI Router (Gemini + RAG / local Ollama) → Data & Analytics Core (Supabase & SQL) → Automated Comms Engine for weekly health reports.`,
      `Tech stack: ${cv.project.techStack.join(", ")}.`,
    ].join(" ");
  }

  if (/(sales|shahina|commercial)/.test(q)) {
    return [
      `As ${shahina.role} at ${shahina.company} (${shahina.period}), I consistently exceeded monthly sales targets over four-plus years specialising in handbags and travel accessories.`,
      `I built a loyal customer base through strong communication, product knowledge, and relationship management — skills that transfer directly into engineering and product teams.`,
    ].join(" ");
  }

  if (/(experience|work|role|job|career)/.test(q)) {
    return [
      `${vylos.role} — ${vylos.company} (${vylos.period}): ${vylos.bullets[0]}`,
      `${shahina.role} — ${shahina.company} (${shahina.period}): Consistently exceeded monthly sales targets over four-plus years.`,
    ].join(" ");
  }

  if (/(vylos|fintech|project|beta)/.test(q)) {
    return [
      `${cv.project.name} is a South African ${cv.project.tagline.toLowerCase()} currently in ${cv.project.status} (${cv.project.period}).`,
      cv.project.description,
    ].join(" ");
  }

  if (/(educat|eduvos|degree|bsc|certificate|module|study|stud)/.test(q)) {
    return [
      `I'm pursuing a ${cv.education[0].degree} at ${cv.education[0].institution} (${cv.education[0].period}) — ${cv.education[0].status}.`,
      `I also completed a ${cv.education[1].degree} at ${cv.education[1].institution} (${cv.education[1].period}).`,
    ].join(" ");
  }

  if (/(skills?|stack|python|sql|llm|technical)/.test(q)) {
    const skillLines = (
      Object.entries(cv.skills) as [string, readonly string[]][]
    )
      .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
      .join(" | ");
    return [
      `Core tech on Vylos Finance: ${cv.project.techStack.join(", ")}.`,
      `Broader skill matrix — ${skillLines}.`,
    ].join(" ");
  }

  if (/(contact|email|phone|linkedin|reach|hire)/.test(q)) {
    return `You can reach me at ${cv.email}, ${cv.phone}, or ${cv.linkedinDisplay}. I'm based in ${cv.location}. Status: ${cv.status}.`;
  }

  if (/(who|introduc|about|yourself|bio|statement|unique|background|differ)/.test(q)) {
    return `${cv.personalStatement}`;
  }

  return [
    `I'm ${cv.name} — ${cv.title}, based in ${cv.location}.`,
    `Ask me about Vylos Finance (${cv.project.period}), Ollama cost savings, Gemini + RAG, Eduvos education, or my sales track at Shahina Enterprise (${shahina.period}).`,
    `Contact: ${cv.email} · ${cv.phone}`,
  ].join(" ");
}

/** @deprecated Prefer getLocalFallbackResponse */
export const localRespond = getLocalFallbackResponse;
