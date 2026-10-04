import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  const { userId } = await auth();
  await checkUser();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-blue-100 bg-blue-50/95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/LOGO1.png"}
            alt="Saarathi Logo"
            width={500}
            height={60}
            className="h-14 py-0.1 w-auto object-contain"
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {userId ? (
            <>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 text-black"
              >
                <LayoutDashboard className="h-4 w-4 text-black" />
                Industry Insights
              </Button>
              <Button variant="outline" className="md:hidden w-10 h-10 p-0 text-black">
                <LayoutDashboard className="h-4 w-4 text-black" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button className="flex items-center gap-2" />
                }
              >
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  render={
                    <Link href="/resume" className="flex items-center gap-2" />
                  }
                >
                    <FileText className="h-4 w-4" />
                    Build Resume
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <Link
                      href="/ai-cover-letter"
                      className="flex items-center gap-2"
                    />
                  }
                >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <Link
                      href="/interview"
                      className="flex items-center gap-2"
                    />
                  }
                >
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          ) : (

            <SignInButton asChild>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          )}

          {userId && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          )}
        </div>
      </nav>
    </header>
  );
}
