import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/resume",
  "/interview",
  "/ai-cover-letter",
  "/onboarding",
];

const isProtectedRoute = (req) =>
  protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
