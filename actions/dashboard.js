"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
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

const fallbackInsights = (industry) => ({
  salaryRanges: [
    {
      role: `${industry} Specialist`,
      min: 50000,
      max: 110000,
      median: 75000,
      location: "United States",
    },
  ],
  growthRate: 5,
  demandLevel: "Medium",
  topSkills: ["Communication", "Problem Solving", "Adaptability"],
  marketOutlook: "Neutral",
  keyTrends: ["Digital transformation", "Specialized hiring", "Continuous learning"],
  recommendedSkills: ["Data Analysis", "Project Management", "Industry Knowledge"],
});

export const generateAIInsights = async (industry) => {
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

  try {
    const result = await generateWithGeminiFallback(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI insight generation failed:", error);
    return fallbackInsights(industry);
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}
