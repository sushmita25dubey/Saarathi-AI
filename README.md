# Saarathi AI – AI Career Coach

**Saarathi AI** is a full-stack AI-powered career coaching platform that
helps students and job seekers make better career decisions, assess
their skills, build job-ready resumes and cover letters, prepare for
interviews, and understand industry trends.

## 🌐 Live Demo

<https://saarathi-ai-gamma.vercel.app/>

## ✨ Features

- 🧭 Personalized AI career guidance
- 📝 Career assessment with scoring and improvement suggestions
- 📄 AI Resume Builder with ATS support and feedback
- ✉️ AI Cover Letter Generator
- 🎤 Interview preparation
- 📊 Industry insights including salary ranges, growth, demand, skills,
  trends, and market outlook
- 🤖 AI Career Assistant
- 🔐 Clerk authentication and protected user data
- ⚡ Scheduled AI workflows with Inngest
- 📱 Responsive UI for desktop, tablet, and mobile

## 🛠️ Tech Stack

| Category           | Technology         |
|--------------------|--------------------|
| Frontend           | React 19           |
| Framework          | Next.js 16         |
| Styling            | Tailwind CSS       |
| UI                 | shadcn/ui          |
| Authentication     | Clerk              |
| AI                 | Google Gemini API  |
| Database           | Neon PostgreSQL    |
| ORM                | Prisma             |
| PostgreSQL Adapter | @prisma/adapter-pg |
| Background Jobs    | Inngest            |
| Charts             | Recharts           |
| Forms              | React Hook Form    |
| Validation         | Zod                |
| Deployment         | Vercel             |

## 🏗️ Architecture

``` text
User
  ↓
Next.js + React + Tailwind + shadcn/ui
  ↓
Clerk Authentication
  ↓
Application/API Layer
  ├── Gemini AI
  ├── Inngest Workflows
  └── Prisma
          ↓
   Neon PostgreSQL
```

## 🤖 AI Workflow

The Industry Insights workflow uses Inngest to periodically:

1.  Fetch industries from PostgreSQL.
2.  Send structured prompts to Gemini.
3.  Generate salary, growth, demand, skills, trends, and market
    insights.
4.  Parse the AI response.
5.  Update the corresponding database records.
6.  Schedule the next update.

## 🚀 Getting Started

### Clone the repository

``` bash
git clone https://github.com/sushmita25dubey/Saarathi-AI.git
cd Saarathi-AI
```

### Install dependencies

``` bash
npm install
```

### Configure environment variables

Create `.env.local`:

``` env
DATABASE_URL="your_neon_postgresql_connection_string"
GEMINI_API_KEY="your_gemini_api_key"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

INNGEST_SIGNING_KEY="your_inngest_signing_key"
```

> Never commit `.env.local` or expose API keys, database credentials,
> Clerk secrets, or the Inngest signing key.

### Generate Prisma Client

``` bash
npx prisma generate
```

### Start the development server

``` bash
npm run dev
```

Open `http://localhost:3000`.

## 🗄️ Database

Saarathi uses Neon PostgreSQL with Prisma ORM and the PostgreSQL
adapter:

``` text
Prisma
  ↓
@prisma/adapter-pg
  ↓
pg
  ↓
Neon PostgreSQL
```

Run Prisma Studio with:

``` bash
npx prisma studio
```

## ⚙️ Inngest

The Inngest endpoint is:

``` text
/api/inngest
```

The production deployment requires `INNGEST_SIGNING_KEY` in Vercel
environment variables.

## 🔐 Security

- Secrets are stored in environment variables.
- Clerk handles authentication.
- User-specific data is protected.
- Database access is handled server-side.
- API keys are not stored in source code.
- Inngest signing-key verification is enabled for production.

## 📂 Main Project Structure

``` text
Saarathi-AI/
├── app/
│   ├── api/
│   │   └── inngest/
│   │       └── route.js
│   └── ...
├── components/
├── data/
├── inngest/
│   ├── client.js
│   └── funtions.js
├── lib/
│   └── prisma.js
├── prisma/
│   └── schema.prisma
├── public/
├── package.json
└── README.md
```

## 🎯 Future Improvements

- Advanced AI career roadmaps
- Job recommendation engine
- Job application tracking
- LinkedIn profile optimization
- GitHub profile analysis
- Skill-gap visualization
- Personalized learning roadmaps
- Voice-based mock interviews
- Advanced ATS analysis
- AI-powered job matching
- Career progress tracking

## 👩‍💻 Developer

**Sushmita Dubey**  
B.Tech Computer Science & Engineering  
Kashi Institute of Technology, Varanasi

- GitHub: <https://github.com/sushmita25dubey>
- LinkedIn: <https://www.linkedin.com/in/sushmita-dubey-4ab988338/>

## ⭐ Support

If you find Saarathi AI useful, consider giving the repository a ⭐ on
GitHub.

## 📄 License

This project is currently intended as a personal/academic portfolio
project.

------------------------------------------------------------------------

<p align="center"><strong>🧭 Saarathi AI — Your AI Career Companion</strong></p>
