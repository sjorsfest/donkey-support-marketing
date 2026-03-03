// Article Renderer Component
// Renders Donkey SEO modular document blocks

import { MarkdownRenderer } from "./MarkdownRenderer"
import type { ModularBlock } from "~/lib/donkey-seo-client.server"

interface ArticleRendererProps {
  blocks: ModularBlock[]
}

export function ArticleRenderer({ blocks }: ArticleRendererProps) {
  return (
    <article className="article-content">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} index={index} />
      ))}
    </article>
  )
}

function BlockRenderer({ block, index }: { block: ModularBlock; index: number }) {
  switch (block.block_type) {
    case "hero":
      return <HeroBlock block={block} />
    case "summary":
      return <SummaryBlock block={block} />
    case "section":
      return <SectionBlock block={block} />
    case "list":
      return <ListBlock block={block} />
    case "comparison_table":
      return <ComparisonTableBlock block={block} />
    case "steps":
      return <StepsBlock block={block} />
    case "faq":
      return <FaqBlock block={block} />
    case "cta":
      return <CtaBlock block={block} />
    case "conclusion":
      return <ConclusionBlock block={block} />
    case "sources":
      return <SourcesBlock block={block} />
    default:
      console.warn(`Unknown block type: ${block.block_type}`)
      return <GenericBlock block={block} />
  }
}

// ============================================================================
// Block Components
// ============================================================================

function HeroBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "header") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-12">
      {block.image && typeof block.image === "object" && "url" in block.image && (
        <img
          src={String(block.image.url)}
          alt={
            "alt_text" in block.image ? String(block.image.alt_text || "") : ""
          }
          className="w-full h-auto rounded-xl border-2 border-outline shadow-lg mb-6"
        />
      )}
      {block.heading && (
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-foreground">
          {block.heading}
        </h1>
      )}
      {block.body && (
        <div className="text-xl text-foreground/70">
          <MarkdownRenderer content={block.body} />
        </div>
      )}
    </Tag>
  )
}

function SummaryBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="bg-yellow-100 border-2 border-outline rounded-xl p-6 mb-8">
      {block.heading && (
        <h2 className="font-display text-2xl font-bold mb-3 text-foreground">
          {block.heading}
        </h2>
      )}
      {block.body && <MarkdownRenderer content={block.body} />}
      {block.items && block.items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-pink-500 font-bold">•</span>
              <div className="flex-1">
                {typeof item === "string" ? (
                  <MarkdownRenderer content={item} />
                ) : typeof item === "object" && item !== null && "text" in item ? (
                  <MarkdownRenderer content={String(item.text)} />
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Tag>
  )
}

function SectionBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-8">
      {block.heading && (
        <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
          {block.heading}
        </h2>
      )}
      {block.body && <MarkdownRenderer content={block.body} />}
    </Tag>
  )
}

function ListBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-8">
      {block.heading && (
        <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
          {block.heading}
        </h2>
      )}
      {block.body && (
        <div className="mb-4">
          <MarkdownRenderer content={block.body} />
        </div>
      )}
      {block.items && block.items.length > 0 && (
        <ul className="space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-pink-500 font-bold text-xl flex-shrink-0">•</span>
              <div className="flex-1">
                {typeof item === "string" ? (
                  <MarkdownRenderer content={item} />
                ) : typeof item === "object" && item !== null ? (
                  <>
                    {"title" in item && item.title && (
                      <h3 className="font-bold text-lg mb-1">{String(item.title)}</h3>
                    )}
                    {"text" in item && item.text && (
                      <MarkdownRenderer content={String(item.text)} />
                    )}
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Tag>
  )
}

function ComparisonTableBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-8">
      {block.heading && (
        <h2 className="font-display text-3xl font-bold mb-6 text-foreground">
          {block.heading}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {block.items &&
          block.items.map((item, i) => {
            if (typeof item !== "object" || item === null) return null

            return (
              <div
                key={i}
                className="bg-white border-2 border-outline rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {"image" in item &&
                  typeof item.image === "object" &&
                  item.image !== null &&
                  "url" in item.image && (
                    <img
                      src={String(item.image.url)}
                      alt={
                        "alt_text" in item.image
                          ? String(item.image.alt_text || "")
                          : ""
                      }
                      className="w-full h-auto rounded-lg mb-4"
                    />
                  )}
                {"title" in item && item.title && (
                  <h3 className="font-bold text-xl mb-2">{String(item.title)}</h3>
                )}
                {"text" in item && item.text && (
                  <MarkdownRenderer content={String(item.text)} />
                )}
              </div>
            )
          })}
      </div>
    </Tag>
  )
}

function StepsBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-8">
      {block.heading && (
        <h2 className="font-display text-3xl font-bold mb-6 text-foreground">
          {block.heading}
        </h2>
      )}
      <div className="space-y-6">
        {block.items &&
          block.items.map((item, i) => {
            if (typeof item !== "object" || item === null) return null

            return (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold border-2 border-outline">
                  {i + 1}
                </div>
                <div className="flex-1">
                  {"title" in item && item.title && (
                    <h3 className="font-bold text-xl mb-2">{String(item.title)}</h3>
                  )}
                  {"text" in item && item.text && (
                    <MarkdownRenderer content={String(item.text)} />
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </Tag>
  )
}

function FaqBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-8">
      {block.heading && (
        <h2 className="font-display text-3xl font-bold mb-6 text-foreground">
          {block.heading}
        </h2>
      )}
      <div className="space-y-4">
        {block.faq_items &&
          block.faq_items.map((item, i) => (
            <details
              key={i}
              className="bg-white border-2 border-outline rounded-xl p-6 group"
            >
              <summary className="font-bold text-lg cursor-pointer list-none hover:text-pink-500 transition-colors">
                {item.question}
              </summary>
              <div className="mt-4 text-foreground/80">
                <MarkdownRenderer content={item.answer} />
              </div>
            </details>
          ))}
      </div>
    </Tag>
  )
}

function CtaBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "aside") as keyof JSX.IntrinsicElements

  return (
    <Tag className="bg-pink-500 text-white border-2 border-outline rounded-xl p-8 mb-8 text-center">
      {block.heading && (
        <h2 className="font-display text-3xl font-bold mb-4">{block.heading}</h2>
      )}
      {block.body && (
        <div className="text-lg mb-6">
          <MarkdownRenderer content={block.body} className="[&_p]:text-white [&_a]:text-yellow-300 [&_a:hover]:text-yellow-100" />
        </div>
      )}
      {block.cta && (
        <a
          href={block.cta.href}
          className="inline-block bg-white text-pink-500 font-bold px-8 py-3 rounded-lg border-2 border-outline shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          {block.cta.label}
        </a>
      )}
    </Tag>
  )
}

function ConclusionBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="bg-muted border-2 border-border rounded-xl p-8 mb-8">
      {block.heading && (
        <h2 className="font-display text-3xl font-bold mb-4 text-foreground">
          {block.heading}
        </h2>
      )}
      {block.body && <MarkdownRenderer content={block.body} />}
    </Tag>
  )
}

function SourcesBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-8 pt-8 border-t-2 border-border">
      {block.heading && (
        <h2 className="font-display text-2xl font-bold mb-4 text-foreground">
          {block.heading}
        </h2>
      )}
      {block.links && block.links.length > 0 && (
        <ol className="list-decimal pl-6 space-y-2">
          {block.links.map((link, i) => (
            <li key={i} className="text-sm">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:underline"
              >
                {link.anchor || link.href}
              </a>
            </li>
          ))}
        </ol>
      )}
    </Tag>
  )
}

function GenericBlock({ block }: { block: ModularBlock }) {
  const Tag = (block.semantic_tag || "section") as keyof JSX.IntrinsicElements

  return (
    <Tag className="mb-8 p-4 border border-dashed border-gray-300 rounded">
      <p className="text-sm text-gray-500 mb-2">
        Unknown block type: {block.block_type}
      </p>
      {block.heading && <h3 className="font-bold mb-2">{block.heading}</h3>}
      {block.body && <MarkdownRenderer content={block.body} />}
    </Tag>
  )
}
