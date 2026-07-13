"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  MORE_NAV_LINKS,
  NAV_LINKS,
  PRIMARY_NAV_LINKS,
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
}: NavLink & { currentPath: string; onNavigate?: () => void }) {
  return (
    <Link
      href={href}
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
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const headerActionsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const moreIsActive = MORE_NAV_LINKS.some(({ href }) => href === currentPath);

  useEffect(() => {
    setMoreOpen(false);
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!moreOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [moreOpen]);

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

  function closeMenus() {
    setMenuOpen(false);
    setMoreOpen(false);
  }

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
          >
            <ul>
              {PRIMARY_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLinkItem
                    {...link}
                    currentPath={currentPath}
                    onNavigate={closeMenus}
                  />
                </li>
              ))}
              <li
                ref={moreRef}
                className={`nav-more${moreOpen ? " nav-more-open" : ""}`}
              >
                <button
                  type="button"
                  className="nav-more-toggle"
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                  aria-current={moreIsActive ? "page" : undefined}
                  onClick={() => setMoreOpen((open) => !open)}
                >
                  More
                  <span aria-hidden="true" className="nav-more-chevron">
                    ▾
                  </span>
                </button>
                <ul className="nav-dropdown">
                  {MORE_NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <NavLinkItem
                        {...link}
                        currentPath={currentPath}
                        onNavigate={closeMenus}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
