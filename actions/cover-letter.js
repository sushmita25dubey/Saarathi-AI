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

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key");
  }

  const safeCompanyName = String(data?.companyName || "").trim();
  const safeJobTitle = String(data?.jobTitle || "").trim();
  const safeJobDescription = String(data?.jobDescription || "").trim();

  if (!safeCompanyName || !safeJobTitle || !safeJobDescription) {
    throw new Error("Please fill in the company name, job title, and job description.");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Write a professional cover letter for a ${safeJobTitle} position at ${safeCompanyName}.
    
    About the candidate:
    - Industry: ${user.industry || "Not specified"}
    - Years of Experience: ${user.experience ?? "Not specified"}
    - Skills: ${user.skills?.join(", ") || "Not specified"}
    - Professional Background: ${user.bio || "Not provided"}
    
    Job Description:
    ${safeJobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;

  try {
    const result = await generateWithGeminiFallback(prompt);
    const content = result?.response?.text?.().trim() || "";

    if (!content) {
      throw new Error("The AI returned an empty cover letter. Please try again.");
    }

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: safeJobDescription,
        companyName: safeCompanyName,
        jobTitle: safeJobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error(
      error?.message?.includes("API key")
        ? "Missing Gemini API key"
        : error?.message || "Failed to generate cover letter"
    );
  }
}

export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}