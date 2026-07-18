"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CALCULATOR_NAV_LINKS,
  GUIDE_NAV_LINKS,
  NAV_LINKS,
  SITE_NAME,
} from "@/lib/site";
import SiteLogoIcon from "@/components/SiteLogoIcon";
import ThemeToggle from "@/components/ThemeToggle";

type NavLink = (typeof NAV_LINKS)[number];

function NavLinkItem({
  href,
  label,
  shortLabel,
  currentPath,
  onNavigate,
  className,
}: NavLink & {
  currentPath: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={className}
      aria-current={currentPath === href ? "page" : undefined}
      onClick={() => onNavigate?.()}
    >
      <span className="nav-label-full">{label}</span>
      <span className="nav-label-short">{shortLabel}</span>
    </Link>
  );
}

export default function Header() {
  const currentPath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopNav, setDesktopNav] = useState(false);
  const headerActionsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1400px)");
    const sync = () => setDesktopNav(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = headerActionsRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  if (currentPath.startsWith("/embed")) {
    return null;
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="site-logo">
          <SiteLogoIcon className="site-logo-icon" />
          <span>{SITE_NAME}</span>
        </Link>
        <div className="header-actions" ref={headerActionsRef}>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="visually-hidden">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <span aria-hidden="true" className="nav-toggle-icon">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
          <nav
            id="main-nav"
            className={`site-nav${menuOpen ? " site-nav-open" : ""}`}
            aria-label="Main navigation"
            hidden={!desktopNav && !menuOpen}
          >
            <ul>
              <li className="nav-group-label" aria-hidden="true">
                Calculators
              </li>
              {CALCULATOR_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLinkItem
                    {...link}
                    currentPath={currentPath}
                    onNavigate={() => setMenuOpen(false)}
                  />
                </li>
              ))}
              <li className="nav-divider" aria-hidden="true" />
              <li className="nav-group-label" aria-hidden="true">
                Guides
              </li>
              {GUIDE_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLinkItem
                    {...link}
                    currentPath={currentPath}
                    className="nav-link-guide"
                    onNavigate={() => setMenuOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
