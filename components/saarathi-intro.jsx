"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function completeIntro() {
  document.documentElement.dataset.saarathiIntroComplete = "true";
  window.dispatchEvent(new Event("saarathi:intro-complete"));
}

export default function SaarathiIntro() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(() => pathname === "/");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isVisible || pathname !== "/") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const exitTimer = window.setTimeout(() => setIsExiting(true), 250);
      const removeTimer = window.setTimeout(() => {
        completeIntro();
        setIsVisible(false);
      }, 400);

      return () => {
        window.clearTimeout(exitTimer);
        window.clearTimeout(removeTimer);
      };
    }

    const exitTimer = window.setTimeout(() => setIsExiting(true), 650);
    const removeTimer = window.setTimeout(() => {
      completeIntro();
      setIsVisible(false);
    }, 1000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [isVisible, pathname]);

  if (!isVisible || pathname !== "/") return null;

  return (
    <div
      className={`saarathi-intro${isExiting ? " is-exiting" : ""}`}
      role="status"
      aria-label="Saarathi, your AI career companion"
      aria-live="polite"
    >
      <div className="saarathi-intro-content" aria-hidden="true">
        <Image
          src="/LOGO1.png"
          alt=""
          width={360}
          height={180}
          preload
          className="saarathi-intro-logo"
        />
        <p className="saarathi-intro-tagline">
          Your AI Career Companion
        </p>
        <div className="saarathi-intro-indicator">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
