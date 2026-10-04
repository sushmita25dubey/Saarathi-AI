"use client";

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { ArrowRight, Play } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribeToIntroComplete(callback) {
  window.addEventListener("saarathi:intro-complete", callback);
  return () => window.removeEventListener("saarathi:intro-complete", callback);
}

function getIntroComplete() {
  return document.documentElement.dataset.saarathiIntroComplete === "true";
}

const HeroSection = () => {
    const imageRef = useRef(null);
    const introComplete = useSyncExternalStore(
      subscribeToIntroComplete,
      getIntroComplete,
      () => false
    );

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
        <div className="space-y-7 text-center">
            <div className="space-y-7 mx-auto">
                <h1
                  style={{ "--hero-reveal-delay": "0ms" }}
                  className={`hero-reveal${introComplete ? " is-active" : ""} hero-reveal-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient`}
                >
                   Your AI Career Guide for
                   <br />
                   Professional Success  
                </h1>
                 <p
                   style={{ "--hero-reveal-delay": "150ms" }}
                   className={`hero-reveal${introComplete ? " is-active" : ""} hero-reveal-description mx-auto max-w-[600px] text-muted-foreground md:text-xl`}
                 >
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
            </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              style={{ "--hero-reveal-delay": "300ms" }}
              className={`hero-reveal${introComplete ? " is-active" : ""} group/button h-12 min-w-44 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/25 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none`}
            >
              Get Started
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1 motion-reduce:transition-none" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            style={{ "--hero-reveal-delay": "400ms" }}
            className={`hero-reveal${introComplete ? " is-active" : ""} group/button h-12 min-w-44 gap-2 rounded-xl border-slate-300 bg-white/80 px-6 text-base font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none`}
            nativeButton={false}
            render={
              <a
                href="https://www.linkedin.com/in/sushmitadubey"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Play className="h-4 w-4 fill-current transition-transform duration-200 group-hover/button:scale-110 motion-reduce:transition-none" />
            Watch Demo
          </Button>
        </div>
        <div
          style={{ "--hero-reveal-delay": "200ms" }}
          className={`hero-image-wrapper hero-image-reveal${introComplete ? " is-active" : ""} mt-5 md:mt-0`}
        >
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner1.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              preload
            />
          </div>
        </div>
        </div>
        </section>
  )
}

export default HeroSection
