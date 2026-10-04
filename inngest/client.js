import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "career-guide", // Unique app ID
  name: "Career Guide", // App name
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});