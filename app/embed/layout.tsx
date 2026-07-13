import EmbedChrome from "@/components/EmbedChrome";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="embed-shell">
      <EmbedChrome />
      {children}
      <p className="embed-attribution">
        Powered by{" "}
        <Link href={SITE_URL} target="_blank" rel="noopener noreferrer">
          {SITE_NAME}
        </Link>
      </p>
    </div>
  );
}
