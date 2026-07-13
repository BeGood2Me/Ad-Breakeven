"use client";

import { useEffect } from "react";

export default function EmbedChrome() {
  useEffect(() => {
    document.documentElement.setAttribute("data-embed", "true");
    return () => {
      document.documentElement.removeAttribute("data-embed");
    };
  }, []);

  return null;
}
