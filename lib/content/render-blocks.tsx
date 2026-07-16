import Link from "next/link";
import type { ContentBlock } from "@/lib/content/types";

export function RenderBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "heading":
            if (block.level === 3) {
              return <h3 key={index}>{block.text}</h3>;
            }
            return <h3 key={index} className="content-subheading">{block.text}</h3>;
          case "formula":
            return (
              <p key={index} className="formula-block">
                {block.text}
              </p>
            );
          case "list":
            if (block.ordered) {
              return (
                <ol key={index}>
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div key={index} className="example-box">
                {block.title && <strong>{block.title}</strong>}
                {block.title && " "}
                {block.text}
              </div>
            );
          case "link":
            return (
              <p key={index}>
                {block.before}
                <Link href={block.href}>{block.linkText}</Link>
                {block.after}
              </p>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
