import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import SaarathiIntro from "@/components/saarathi-intro";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Saarathi - AI Career Guide",
  description: "Saarathi is an AI-powered career guide that helps you navigate your career path, providing personalized guidance and support to achieve your professional goals.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
        baseTheme: dark,
      }} >
    <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <SaarathiIntro />
          {/*hearder*/}
          <Header />
          <main className="min-h-screen">{children}</main>
          {/*footer*/}
          <footer className="relative z-10 mt-10 bg-muted/50 py-12 border-b border-blue-100 bg-blue-50/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 text-center text-blue-950 ">
              <p>Made with 💗 by SushmitaDubey</p>
            </div>
          </footer>
          <Toaster />
        </body>
      </html>
        </ClerkProvider>
  );
}
