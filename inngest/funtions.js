// src/inngest/functions.js
import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CONFIGURED_GEMINI_MODEL = process.env.GEMINI_MODEL;
const DEFAULT_GEMINI_MODEL =
  CONFIGURED_GEMINI_MODEL === "gemini-2.0-flash" ||
  CONFIGURED_GEMINI_MODEL === "gemini-1.5-flash"
    ? "gemini-3.8-flash"
    : CONFIGURED_GEMINI_MODEL || "gemini-3.8-flash";
const FALLBACK_GEMINI_MODEL = "gemini-3.8-flash";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateWithGeminiFallback(prompt) {
  const primaryModel = genAI.getGenerativeModel({ model: DEFAULT_GEMINI_MODEL });

  try {
    return await primaryModel.generateContent(prompt);
  } catch (error) {
    const message = String(error?.message || error);
    const shouldRetry =
      error?.status === 503 ||
      error?.status === 429 ||
      /high demand|temporar|unavailable|rate limit/i.test(message);

    if (shouldRetry && DEFAULT_GEMINI_MODEL !== FALLBACK_GEMINI_MODEL) {
      const fallbackModel = genAI.getGenerativeModel({
        model: FALLBACK_GEMINI_MODEL,
      });
      return await fallbackModel.generateContent(prompt);
    }

    throw error;
  }
}

export const generateIndustryInsights = inngest.createFunction(
  {
    id: "generate-industry-insights",
    name: "Generate Industry Insights",
    triggers: { cron: "0 0 * * 0" },
  },
  async ({ step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return await generateWithGeminiFallback(p);
        },
        prompt
      );

      const text = res.response.candidates[0].content.parts[0].text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      const insights = JSON.parse(cleanedText);

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);
