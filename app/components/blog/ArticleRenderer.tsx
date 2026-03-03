// Article Renderer Component
// Renders Donkey SEO modular document blocks with full visual hierarchy

import type { ReactNode } from "react"
import type { ModularDocument, ModularBlock } from "~/lib/donkey-seo-client.server"
import { cn } from "~/lib/utils"

// ============================================================================
// Type Helpers
// ============================================================================

function safeString(value: unknown): string {
  if (value === null || value === undefined) return ""
  return String(value)
}

function safeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

// ============================================================================
// Markdown Rendering
// ============================================================================

const INLINE_MARKDOWN_PATTERN = /(\[[^\]]+\]\((?:https?:\/\/[^\s)]+|#[^)]+)\)|\*\*[^*\n]+\*\*|`[^`\n]+`)/g
const LINK_MARKDOWN_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/
const FENCED_CODE_BLOCK_PATTERN = /```([a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g

type MarkdownBlock = {
  type: "paragraph" | "code"
  value: string
  language?: string
}

function renderTextWithLineBreaks(text: string, keyPrefix: string): ReactNode[] {
  const lines = text.split("\n")
  const nodes: ReactNode[] = []
  lines.forEach((line, index) => {
    nodes.push(line)
    if (index < lines.length - 1) {
      nodes.push(<br key={`${keyPrefix}-br-${index}`} />)
    }
  })
  return nodes
}

function renderInlineMarkdown(value: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0
  let tokenIndex = 0

  for (const match of value.matchAll(INLINE_MARKDOWN_PATTERN)) {
    const token = match[0]
    if (!token) continue
    const start = match.index ?? 0
    const plainText = value.slice(cursor, start)
    if (plainText) {
      nodes.push(...renderTextWithLineBreaks(plainText, `plain-${tokenIndex}`))
      tokenIndex += 1
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`strong-${tokenIndex}`} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      )
      tokenIndex += 1
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={`code-${tokenIndex}`}
          className="rounded bg-yellow-100 px-2 py-0.5 font-mono text-sm border border-outline text-foreground"
        >
          {token.slice(1, -1)}
        </code>,
      )
      tokenIndex += 1
    } else {
      const linkMatch = token.match(LINK_MARKDOWN_PATTERN)
      if (linkMatch) {
        const [, label, href] = linkMatch
        const isAnchor = href.startsWith("#")
        nodes.push(
          <a
            key={`link-${tokenIndex}`}
            href={href}
            target={isAnchor ? undefined : "_blank"}
            rel={isAnchor ? undefined : "noopener noreferrer"}
            className="text-pink-500 hover:text-pink-600 underline underline-offset-2 font-medium transition-colors"
          >
            {label}
          </a>,
        )
        tokenIndex += 1
      } else {
        nodes.push(...renderTextWithLineBreaks(token, `token-${tokenIndex}`))
        tokenIndex += 1
      }
    }

    cursor = start + token.length
  }

  const trailingText = value.slice(cursor)
  if (trailingText) {
    nodes.push(...renderTextWithLineBreaks(trailingText, `trail-${tokenIndex}`))
  }

  return nodes
}

function parseMarkdownBlocks(value: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = []
  let cursor = 0

  const pushParagraphBlocks = (text: string) => {
    text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .forEach((paragraph) => {
        blocks.push({ type: "paragraph", value: paragraph })
      })
  }

  for (const match of value.matchAll(FENCED_CODE_BLOCK_PATTERN)) {
    const fullMatch = match[0]
    if (!fullMatch) continue
    const start = match.index ?? 0
    pushParagraphBlocks(value.slice(cursor, start))
    blocks.push({
      type: "code",
      language: safeString(match[1]),
      value: safeString(match[2]).replace(/\n$/, ""),
    })
    cursor = start + fullMatch.length
  }

  pushParagraphBlocks(value.slice(cursor))
  return blocks
}

function MarkdownContent({
  content,
  className,
  paragraphClassName,
}: {
  content: string
  className?: string
  paragraphClassName: string
}) {
  const normalized = safeString(content).trim()
  if (!normalized) return null

  const blocks = parseMarkdownBlocks(normalized)
  if (blocks.length === 0) return null

  return (
    <div className={cn("space-y-4", className)}>
      {blocks.map((block, index) =>
        block.type === "code" ? (
          <pre
            key={index}
            data-language={block.language || undefined}
            className="overflow-x-auto rounded-xl bg-foreground px-5 py-4 text-sm leading-relaxed text-white border-2 border-outline shadow-md font-mono"
          >
            <code>{block.value}</code>
          </pre>
        ) : (
          <p key={index} className={paragraphClassName}>
            {renderInlineMarkdown(block.value)}
          </p>
        ),
      )}
    </div>
  )
}

function MarkdownInline({ content }: { content: string }) {
  const text = safeString(content)
  if (!text) return null
  return <>{renderInlineMarkdown(text)}</>
}

// ============================================================================
// Heading Tag Helper
// ============================================================================

function headingTag(level: number | undefined | null): "h2" | "h3" | "h4" {
  if (!level || level < 2) return "h2"
  if (level === 3) return "h3"
  return "h4"
}

const headingStyles: Record<string, string> = {
  h2: "font-display text-3xl sm:text-4xl font-bold leading-tight text-foreground",
  h3: "font-display text-2xl sm:text-3xl font-bold leading-tight text-foreground",
  h4: "font-display text-xl sm:text-2xl font-bold leading-snug text-foreground",
}

// ============================================================================
// Link List Component
// ============================================================================

type LinkObject = { href?: string; anchor?: string }

function BlockLinks({ links }: { links?: ModularBlock["links"] }) {
  const safeLinks = safeArray(links).filter(
    (l): l is LinkObject => typeof l === "object" && l !== null && !!safeString((l as LinkObject).href),
  )
  if (safeLinks.length === 0) return null

  return (
    <ul className="mt-5 flex flex-wrap gap-3">
      {safeLinks.map((link, i) => {
        const href = safeString(link.href)
        const text = safeString(link.anchor) || href
        return (
          <li key={i}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-pink-500 hover:text-pink-600 font-medium transition-colors underline underline-offset-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

// ============================================================================
// Block Renderers
// ============================================================================

function HeroBlock({ block, skipHeading }: { block: ModularBlock; skipHeading: boolean }) {
  const heading = safeString(block.heading)
  const body = safeString(block.body)
  if (!heading && !body) return null

  return (
    <header className="rounded-2xl border-2 border-outline bg-yellow-100/80 px-8 py-10 shadow-lg">
      {heading && !skipHeading && (
        <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-foreground mb-5">
          {heading}
        </h2>
      )}
      {body && (
        <MarkdownContent
          content={body}
          className={cn(!skipHeading && heading && "mt-0")}
          paragraphClassName="text-lg leading-relaxed text-foreground/80"
        />
      )}
      <BlockLinks links={block.links} />
    </header>
  )
}

function SummaryBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const body = safeString(block.body)
  const items = safeArray<string>(block.items)

  return (
    <section className="rounded-xl border-2 border-outline border-l-[6px] border-l-pink-500 bg-pink-50/60 px-7 py-6 shadow-md">
      {heading && (
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-pink-600 mb-3">
          {heading}
        </h3>
      )}
      {body && (
        <MarkdownContent
          content={body}
          className={cn(heading && "mt-0")}
          paragraphClassName="text-base leading-relaxed text-foreground/80"
        />
      )}
      {items.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-pink-500" />
              <span className="text-base leading-relaxed text-foreground/80">
                <MarkdownInline content={safeString(item)} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <BlockLinks links={block.links} />
    </section>
  )
}

function SectionBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const body = safeString(block.body)
  const items = safeArray<string>(block.items)
  const Tag = headingTag(block.level)

  return (
    <section className="space-y-4">
      {heading && <Tag className={headingStyles[Tag]}>{heading}</Tag>}
      {body && (
        <MarkdownContent
          content={body}
          paragraphClassName="text-base leading-relaxed text-foreground/70"
        />
      )}
      {items.length > 0 && (
        <ul className="space-y-3 mt-5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 pl-1">
              <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-pink-500" />
              <span className="flex-1 text-base leading-relaxed text-foreground/70">
                <MarkdownInline content={safeString(item)} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <BlockLinks links={block.links} />
    </section>
  )
}

function ListBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const items = safeArray<string>(block.items)
  const isOrdered = block.ordered === true
  const Tag = headingTag(block.level)

  return (
    <section className="space-y-4">
      {heading && <Tag className={headingStyles[Tag]}>{heading}</Tag>}
      {isOrdered ? (
        <ol className="space-y-3 pl-6">
          {items.map((item, i) => (
            <li
              key={i}
              className="list-decimal pl-2 text-base leading-relaxed text-foreground/70 marker:font-bold marker:text-pink-500"
            >
              <MarkdownInline content={safeString(item)} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 pl-1">
              <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-pink-500" />
              <span className="flex-1 text-base leading-relaxed text-foreground/70">
                <MarkdownInline content={safeString(item)} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <BlockLinks links={block.links} />
    </section>
  )
}

function StepsBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const items = safeArray<string>(block.items)
  const Tag = headingTag(block.level)

  return (
    <section className="space-y-5">
      {heading && <Tag className={headingStyles[Tag]}>{heading}</Tag>}
      <ol className="space-y-5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 text-white font-bold text-lg border-2 border-outline shadow-md">
              {i + 1}
            </span>
            <span className="flex-1 pt-1.5 text-base leading-relaxed text-foreground/70">
              <MarkdownInline content={safeString(item)} />
            </span>
          </li>
        ))}
      </ol>
      <BlockLinks links={block.links} />
    </section>
  )
}

function ComparisonTableBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const columns = safeArray<string>(block.table_columns)
  const rows = safeArray<string[]>(block.table_rows)
  const Tag = headingTag(block.level)

  if (columns.length === 0) return null

  return (
    <section className="space-y-5">
      {heading && <Tag className={headingStyles[Tag]}>{heading}</Tag>}
      <div className="overflow-x-auto rounded-xl border-2 border-outline shadow-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-outline bg-yellow-100">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-foreground"
                >
                  {safeString(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const cells = Array.isArray(row) ? row : []
              return (
                <tr
                  key={ri}
                  className="border-b border-outline/50 last:border-b-0 even:bg-yellow-50/40 hover:bg-yellow-100/50 transition-colors"
                >
                  {cells.map((cell, ci) => (
                    <td key={ci} className="px-6 py-4 text-foreground/70">
                      <MarkdownInline content={safeString(cell)} />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <BlockLinks links={block.links} />
    </section>
  )
}

type FaqItem = { question?: string; answer?: string }

function FaqBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const faqItems = safeArray(block.faq_items).filter(
    (item): item is FaqItem => typeof item === "object" && item !== null && !!safeString((item as FaqItem).question),
  )
  const Tag = headingTag(block.level)

  if (faqItems.length === 0) return null

  return (
    <section className="space-y-5">
      {heading && <Tag className={headingStyles[Tag]}>{heading}</Tag>}
      <div className="space-y-3">
        {faqItems.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border-2 border-outline bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <summary className="cursor-pointer select-none list-none px-6 py-4 text-base font-bold text-foreground marker:content-[''] transition-colors hover:bg-yellow-50">
              <span className="flex items-center justify-between gap-3">
                <span>
                  <MarkdownInline content={safeString(item.question)} />
                </span>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 text-white text-sm transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <div className="border-t-2 border-outline bg-yellow-50/30 px-6 py-5">
              <MarkdownContent
                content={safeString(item.answer)}
                paragraphClassName="text-sm leading-relaxed text-foreground/70"
              />
            </div>
          </details>
        ))}
      </div>
      <BlockLinks links={block.links} />
    </section>
  )
}

type CtaObject = { label?: string; href?: string }

function CtaBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const body = safeString(block.body)
  const cta: CtaObject = typeof block.cta === "object" && block.cta !== null ? block.cta as CtaObject : {}
  const ctaLabel = safeString(cta.label) || "Learn more"
  const ctaHref = safeString(cta.href) || "#"

  return (
    <aside className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 px-10 py-14 text-center shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />

      {/* Content */}
      <div className="relative z-10">
        {heading && (
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-5 drop-shadow-sm">
            {heading}
          </h2>
        )}
        {body && (
          <MarkdownContent
            content={body}
            className={cn(heading && "mt-0")}
            paragraphClassName="mx-auto max-w-2xl text-lg leading-relaxed text-white/95 drop-shadow-sm"
          />
        )}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-pink-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200",
            heading || body ? "mt-7" : "",
          )}
        >
          {ctaLabel}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </aside>
  )
}

function ConclusionBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const body = safeString(block.body)
  const items = safeArray<string>(block.items)
  const Tag = headingTag(block.level)

  return (
    <footer className="rounded-xl border-2 border-outline border-l-[6px] border-l-yellow-500 bg-yellow-50/60 px-7 py-6 shadow-md">
      {heading && <Tag className={cn(headingStyles[Tag], "text-yellow-700")}>{heading}</Tag>}
      {body && (
        <MarkdownContent
          content={body}
          className={cn(heading && "mt-4")}
          paragraphClassName="text-base leading-relaxed text-foreground/80"
        />
      )}
      {items.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-yellow-600" />
              <span className="text-base leading-relaxed text-foreground/80">
                <MarkdownInline content={safeString(item)} />
              </span>
            </li>
          ))}
        </ul>
      )}
      <BlockLinks links={block.links} />
    </footer>
  )
}

function SourcesBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading) || "Sources"
  const body = safeString(block.body)
  const links = safeArray(block.links).filter(
    (l): l is LinkObject => typeof l === "object" && l !== null && !!safeString((l as LinkObject).href),
  )

  return (
    <section className="rounded-xl border-2 border-outline bg-background/40 px-6 py-5 shadow-sm">
      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/60">{heading}</h3>
      {body && (
        <MarkdownContent
          content={body}
          className="mt-2"
          paragraphClassName="text-sm leading-relaxed text-foreground/60"
        />
      )}
      {links.length > 0 && (
        <ul className="mt-4 space-y-2">
          {links.map((link, i) => {
            const href = safeString(link.href)
            const text = safeString(link.anchor) || href
            return (
              <li key={i}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-pink-500 hover:text-pink-600 transition-colors underline underline-offset-2"
                >
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {text}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function FallbackBlock({ block }: { block: ModularBlock }) {
  const heading = safeString(block.heading)
  const body = safeString(block.body)
  if (!heading && !body) return null

  return (
    <section className="space-y-4 rounded-lg border-2 border-dashed border-outline/30 bg-muted/20 p-6">
      <p className="text-xs text-muted-foreground">Unknown block type: {block.block_type}</p>
      {heading && <h3 className="font-bold text-lg">{heading}</h3>}
      {body && (
        <MarkdownContent
          content={body}
          paragraphClassName="text-base leading-relaxed text-foreground/70"
        />
      )}
      <BlockLinks links={block.links} />
    </section>
  )
}

// ============================================================================
// Block Dispatcher
// ============================================================================

function ArticleBlock({
  block,
  articleHasH1,
}: {
  block: ModularBlock
  articleHasH1: boolean
}) {
  const blockType = safeString(block.block_type)

  switch (blockType) {
    case "hero":
      return <HeroBlock block={block} skipHeading={articleHasH1} />
    case "summary":
      return <SummaryBlock block={block} />
    case "section":
      return <SectionBlock block={block} />
    case "list":
      return <ListBlock block={block} />
    case "steps":
      return <StepsBlock block={block} />
    case "comparison_table":
      return <ComparisonTableBlock block={block} />
    case "faq":
      return <FaqBlock block={block} />
    case "cta":
      return <CtaBlock block={block} />
    case "conclusion":
      return <ConclusionBlock block={block} />
    case "sources":
      return <SourcesBlock block={block} />
    default:
      return <FallbackBlock block={block} />
  }
}

// ============================================================================
// Main Article Renderer
// ============================================================================

interface ArticleRendererProps {
  document: ModularDocument
}

export function ArticleRenderer({ document }: ArticleRendererProps) {
  const seoMeta = document.seo_meta
  const author = document.author
  const featuredImage = document.featured_image
  const blocks = safeArray<ModularBlock>(document.blocks)

  const h1Text = safeString(seoMeta?.h1)
  const featuredImageUrl = safeString(featuredImage?.signed_url)
  const featuredImageTitle = safeString(featuredImage?.title_text)
  const authorName = safeString(author?.name)
  const authorBio = safeString(author?.bio)
  const authorProfileImage = safeString(author?.profile_image?.signed_url)
  const authorTwitter = author?.social_urls?.twitter || author?.social_urls?.x
  const authorWebsite = author?.social_urls?.website

  return (
    <article className="mx-auto max-w-4xl space-y-10 py-2">
      {/* Article H1 */}
      {h1Text && (
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
          {h1Text}
        </h1>
      )}

      {/* Author Byline */}
      {authorName && (
        <div className="flex items-center gap-5 rounded-xl border-2 border-outline bg-white px-6 py-5 shadow-md">
          {authorProfileImage ? (
            <img
              src={authorProfileImage}
              alt={authorName}
              className="h-16 w-16 rounded-full object-cover border-2 border-outline shadow-sm"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 border-2 border-outline text-foreground/40">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-lg text-foreground">{authorName}</span>
              {(authorTwitter || authorWebsite) && (
                <div className="flex items-center gap-2">
                  {authorTwitter && (
                    <a
                      href={authorTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {authorWebsite && (
                    <a
                      href={authorWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                      aria-label="Website"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
            {authorBio && (
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{authorBio}</p>
            )}
          </div>
        </div>
      )}

      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="overflow-hidden rounded-2xl border-2 border-outline shadow-xl">
          <img
            src={featuredImageUrl}
            alt={featuredImageTitle || h1Text || "Article featured image"}
            className="w-full object-cover"
            style={{
              aspectRatio:
                featuredImage?.width && featuredImage?.height
                  ? `${featuredImage.width} / ${featuredImage.height}`
                  : "16 / 9",
            }}
          />
        </div>
      )}

      {/* Article Blocks */}
      {blocks.map((block, index) => (
        <ArticleBlock key={index} block={block} articleHasH1={!!h1Text} />
      ))}
    </article>
  )
}
