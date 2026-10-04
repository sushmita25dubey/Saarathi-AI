import {
  BrainCircuit,
  Briefcase,
  ScrollText,
  LineChart,
} from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-blue-700" />,
    title: "AI Career Guidance",
    description:
      "Get personalized career recommendations based on your interests, skills, strengths, education, and goals.",
  },
  {
   icon: <Briefcase className="h-6 w-6 text-blue-700" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-blue-700" />,
    title: "Industry Insights",
    description:
      "Stay ahead with real-time industry trends, salary data, and market analysis.",
  },
  {
    icon: <ScrollText className="h-6 w-6 text-blue-700" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
  },
];