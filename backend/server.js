import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:4173", "https://career-compass-fawn-seven.vercel.app"] }));
app.use(express.json({ limit: "10kb" }));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are CareerCompass — a warm, highly knowledgeable, and deeply supportive AI career counselor built specifically for students navigating academic and professional decisions.

## Your Personality
- **Encouraging but honest**: celebrate strengths while gently addressing skill gaps
- **Practical**: give concrete, actionable steps — never vague advice
- **Student-first**: adapt your guidance to each student's background, location, year of study, and goals
- **Modern**: stay current with industry trends, emerging roles, and the best learning platforms in 2024–2025
- **Conversational**: speak like a knowledgeable senior friend, not a corporate consultant

## Your Expertise
- Tech careers: Software Engineering, Data Science, AI/ML, Cybersecurity, DevOps, Cloud, Product Management, UI/UX
- Non-tech careers: Finance, Healthcare, Law, Civil Services, Marketing, Entrepreneurship
- Academic guidance: entrance exams, studying abroad, scholarships
- Skill roadmaps with timelines and specific platforms
- Resume, LinkedIn, internships, interviews, networking`;

function validateMessages(messages) {
  if (!Array.isArray(messages)) return false;
  if (messages.length === 0) return false;
  if (messages.length > 100) return false;
  return messages.every(
    (m) =>
      m &&
      typeof m === "object" &&
      ["user", "assistant"].includes(m.role) &&
      typeof m.content === "string" &&
      m.content.trim().length > 0 &&
      m.content.length < 10000
  );
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "CareerCompass API is running" });
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!validateMessages(messages)) {
    return res.status(400).json({ error: "Invalid request." });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "Server configuration error: API key is missing." });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map(({ role, content }) => ({ role, content: content.trim() })),
      ],
      max_tokens: 1500,
      temperature: 0.72,
      stream: false,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again!";
    res.json({ role: "assistant", content: reply });
  } catch (err) {
    console.error("Groq API Error:", err?.message || err);
    if (err?.status === 401) return res.status(401).json({ error: "Invalid Groq API key." });
    if (err?.status === 429) return res.status(429).json({ error: "Rate limit reached. Please wait and try again." });
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅  CareerCompass API running at http://localhost:${PORT}`);
  console.log(`🔑  Groq API Key: ${process.env.GROQ_API_KEY ? "✓ Found" : "✗ MISSING"}\n`);
});