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

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await generateWithGeminiFallback(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const quiz = JSON.parse(cleanedText);

    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      throw new Error("The AI returned no quiz questions");
    }

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("Can't reach database server")) {
      throw new Error(
        "The database is unavailable. Check your DATABASE_URL and database connection."
      );
    }

    if (message.includes("API key") || message.includes("401")) {
      throw new Error("The Gemini API key is invalid or missing.");
    }

    throw new Error(`Quiz generation failed: ${message}`);
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  // Get wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  // Only generate improvement tips if there are wrong answers
  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await generateWithGeminiFallback(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}