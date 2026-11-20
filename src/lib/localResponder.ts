import { cv } from "@/data/cv";

function normalize(q: string) {
  return q.toLowerCase().replace(/[^\w\s+]/g, " ").replace(/\s+/g, " ").trim();
}

export function localRespond(question: string): string {
  const q = normalize(question);

  if (
    /(cost|ollama|infrastructure|self.?host|expensive|api.?call|reduc)/.test(q)
  ) {
    return [
      `At Vylos Finance (${cv.project.period}), I optimized AI infrastructure costs by self-hosting LLM capabilities via Ollama on local hardware.`,
      `That cut reliance on expensive third-party API calls for high-volume or cost-sensitive inference, while keeping Gemini API + RAG available for grounded financial insights where accuracy matters most.`,
      `The hybrid router balances quality (Gemini + RAG) against cost (local Ollama) without sacrificing the beta product experience.`,
    ].join(" ");
  }

  if (/(gemini|rag|chatbot|architect|hallucin)/.test(q)) {
    return [
      `The Vylos Finance chatbot uses the Gemini API with Retrieval-Augmented Generation (RAG).`,
      `User queries hit the client interface, then a hybrid AI router: Gemini + RAG grounds answers in structured financial records (Supabase & SQL) to minimize hallucination, while local Ollama handles cost-efficient inference.`,
      `Weekly automated communications (HTML templates + transactional email) deliver financial health reports on top of that stack.`,
      `Tech: ${cv.project.techStack.join(", ")}.`,
    ].join(" ");
  }

  if (/(unique|sales|shahina|commercial|background|differ)/.test(q)) {
    return [
      `My profile combines deep technical build experience with real commercial execution.`,
      `As Co-Founder & AI Systems Lead at Vylos Finance I ship backend + AI systems in a live beta fintech product.`,
      `In parallel, I've spent 4+ years as a part-time salesperson at Shahina Enterprise (Feb 2021 – Present), consistently exceeding monthly sales targets in handbags and travel accessories.`,
      `That dual track gives me data/AI engineering ability plus communication, resilience, and customer empathy that transfer directly into product and engineering teams.`,
    ].join(" ");
  }

  if (/(educat|degree|eduvos|bsc|certificate|module|stack|skill|tech)/.test(q)) {
    const skillLines = (
      Object.entries(cv.skills) as [string, readonly string[]][]
    )
      .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
      .join(" | ");

    return [
      `Education: ${cv.education[0].degree} at ${cv.education[0].institution} (${cv.education[0].period}) — ${cv.education[0].status}. ${cv.education[0].details}`,
      `Also completed: ${cv.education[1].degree} (${cv.education[1].period}). ${cv.education[1].details}`,
      `Core tech on Vylos Finance: ${cv.project.techStack.join(", ")}.`,
      `Skill matrix — ${skillLines}.`,
    ].join(" ");
  }

  if (/(who|introduc|about|yourself|bio|statement)/.test(q)) {
    return `${cv.name} — ${cv.title}. Based in ${cv.location}. ${cv.personalStatement}`;
  }

  if (/(contact|email|phone|linkedin|reach)/.test(q)) {
    return `Reach ${cv.name} at ${cv.email}, ${cv.phone}, or ${cv.linkedinDisplay}. CV: ${cv.cvPath}. Location: ${cv.location} (${cv.coordinates}). Status: ${cv.status}.`;
  }

  if (/(vylos|fintech|project|beta)/.test(q)) {
    return [
      `${cv.project.name} (${cv.project.status}, ${cv.project.period}): ${cv.project.description}`,
      `User-facing impact: ${cv.project.userView.points.join(" ")}`,
    ].join(" ");
  }

  if (/(experience|work|role|job)/.test(q)) {
    return cv.experience
      .map(
        (e) =>
          `${e.role} — ${e.company} (${e.period}): ${e.bullets.join(" ")}`,
      )
      .join("\n\n");
  }

  return [
    `I'm the Digital Twin of ${cv.name} (${cv.title}, ${cv.location}).`,
    cv.personalStatement,
    `Ask about Vylos Finance architecture, Ollama cost savings, Gemini + RAG, education at Eduvos, or the Shahina Enterprise sales track.`,
    `Contact: ${cv.email} · ${cv.phone} · ${cv.linkedinDisplay}`,
  ].join(" ");
}
