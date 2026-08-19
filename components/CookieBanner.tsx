"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export type CookieConsent = "accepted" | "declined";

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function setCookieConsent(value: CookieConsent) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(
    new CustomEvent("cookie-consent-change", { detail: value })
  );
}

export default function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/embed/")) {
      setVisible(false);
      return;
    }
    setVisible(getCookieConsent() === null);
  }, [pathname]);

  if (!visible) return null;

  function accept() {
    setCookieConsent("accepted");
    setVisible(false);
  }

  function decline() {
    setCookieConsent("declined");
    setVisible(false);
  }

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-banner-text"
    >
      <p id="cookie-banner-text" className="cookie-banner-text">
        We use cookies to measure site traffic. See our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-banner-btn" onClick={decline}>
          Decline
        </button>
        <button
          type="button"
          className="cookie-banner-btn cookie-banner-btn-primary"
          onClick={accept}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
