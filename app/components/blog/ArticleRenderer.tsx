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
const TABLE_PATTERN = /^\|(.+)\|\n\|[\s:-]+\|\n((?:\|.+\|\n?)*)/gm

type MarkdownBlock = {
  type: "paragraph" | "code" | "table"
  value: string
  language?: string
  tableData?: {
    headers: string[]
    rows: string[][]
  }
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
          className="rounded bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-800"
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

function parseTableData(tableMarkdown: string): { headers: string[]; rows: string[][] } {
  const lines = tableMarkdown.trim().split("\n")
  if (lines.length < 2) {
    return { headers: [], rows: [] }
  }

  // Parse header row
  const headerLine = lines[0].trim()
  const headers = headerLine
    .split("|")
    .map((cell) => cell.trim())
    .filter(Boolean)

  // Skip separator line (index 1) and parse data rows
  const rows: string[][] = []
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const cells = line
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean)
    if (cells.length > 0) {
      rows.push(cells)
    }
  }

  return { headers, rows }
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

  // Find all code blocks and tables
  const allMatches: Array<{ type: "code" | "table"; index: number; length: number; data: MarkdownBlock }> = []

  // Collect code blocks
  for (const match of value.matchAll(FENCED_CODE_BLOCK_PATTERN)) {
    const fullMatch = match[0]
    if (!fullMatch) continue
    const start = match.index ?? 0
    allMatches.push({
      type: "code",
      index: start,
      length: fullMatch.length,
      data: {
        type: "code",
        language: safeString(match[1]),
        value: safeString(match[2]).replace(/\n$/, ""),
      },
    })
  }

  // Collect tables
  for (const match of value.matchAll(TABLE_PATTERN)) {
    const fullMatch = match[0]
    if (!fullMatch) continue
    const start = match.index ?? 0
    const tableData = parseTableData(fullMatch)
    if (tableData.headers.length > 0) {
      allMatches.push({
        type: "table",
        index: start,
        length: fullMatch.length,
        data: {
          type: "table",
          value: fullMatch,
          tableData,
        },
      })
    }
  }

  // Sort matches by index
  allMatches.sort((a, b) => a.index - b.index)

  // Process in order
  for (const match of allMatches) {
    pushParagraphBlocks(value.slice(cursor, match.index))
    blocks.push(match.data)
    cursor = match.index + match.length
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
      {blocks.map((block, index) => {
        if (block.type === "code") {
          return (
            <pre
              key={index}
              data-language={block.language || undefined}
              className="overflow-x-auto rounded-xl bg-gray-900 px-5 py-4 text-sm leading-relaxed text-gray-100 shadow-sm font-mono"
            >
              <code>{block.value}</code>
            </pre>
          )
        }

        if (block.type === "table" && block.tableData) {
          const { headers, rows } = block.tableData
          return (
            <div key={index} className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700"
                      >
                        <MarkdownInline content={header} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-gray-100 last:border-b-0 even:bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-6 py-4 text-gray-700">
                          <MarkdownInline content={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        return (
          <p key={index} className={paragraphClassName}>
            {renderInlineMarkdown(block.value)}
          </p>
        )
      })}
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
  h2: "font-display text-3xl sm:text-4xl font-bold leading-tight text-gray-900",
  h3: "font-display text-2xl sm:text-3xl font-bold leading-tight text-gray-900",
  h4: "font-display text-xl sm:text-2xl font-bold leading-snug text-gray-900",
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
    <header className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 px-8 py-10">
      {heading && !skipHeading && (
        <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-gray-900 mb-5">
          {heading}
        </h2>
      )}
      {body && (
        <MarkdownContent
          content={body}
          className={cn(!skipHeading && heading && "mt-0")}
          paragraphClassName="text-lg leading-relaxed text-gray-700"
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
    <section className="rounded-xl border-l-4 border-l-pink-400 bg-gray-50 px-7 py-6">
      {heading && (
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-gray-700 mb-3">
          {heading}
        </h3>
      )}
      {body && (
        <MarkdownContent
          content={body}
          className={cn(heading && "mt-0")}
          paragraphClassName="text-base leading-relaxed text-gray-700"
        />
      )}
      {items.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-pink-400" />
              <span className="text-base leading-relaxed text-gray-700">
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
          paragraphClassName="text-base leading-relaxed text-gray-700"
        />
      )}
      {items.length > 0 && (
        <ul className="space-y-3 mt-5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 pl-1">
              <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-pink-400" />
              <span className="flex-1 text-base leading-relaxed text-gray-700">
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
              className="list-decimal pl-2 text-base leading-relaxed text-gray-700 marker:font-bold marker:text-pink-400"
            >
              <MarkdownInline content={safeString(item)} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 pl-1">
              <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-pink-400" />
              <span className="flex-1 text-base leading-relaxed text-gray-700">
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
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-pink-500 text-white font-bold text-base shadow-sm">
              {i + 1}
            </span>
            <span className="flex-1 pt-1 text-base leading-relaxed text-gray-700">
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
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-700"
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
                  className="border-b border-gray-100 last:border-b-0 even:bg-gray-50/50 hover:bg-gray-50 transition-colors"
                >
                  {cells.map((cell, ci) => (
                    <td key={ci} className="px-6 py-4 text-gray-700">
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
            className="group rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            <summary className="cursor-pointer select-none list-none px-6 py-4 text-base font-semibold text-gray-900 marker:content-[''] transition-colors hover:bg-gray-50">
              <span className="flex items-center justify-between gap-3">
                <span>
                  <MarkdownInline content={safeString(item.question)} />
                </span>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-pink-400 text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-5">
              <MarkdownContent
                content={safeString(item.answer)}
                paragraphClassName="text-sm leading-relaxed text-gray-700"
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
    <aside className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border border-pink-100 px-10 py-12 text-center">
      {/* Subtle decorative element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {heading && (
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {heading}
          </h2>
        )}
        {body && (
          <MarkdownContent
            content={body}
            className={cn(heading && "mt-0")}
            paragraphClassName="mx-auto max-w-2xl text-base leading-relaxed text-gray-700"
          />
        )}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-200",
            heading || body ? "mt-6" : "",
          )}
        >
          {ctaLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <footer className="rounded-xl border-l-4 border-l-blue-400 bg-blue-50 px-7 py-6">
      {heading && <Tag className={headingStyles[Tag]}>{heading}</Tag>}
      {body && (
        <MarkdownContent
          content={body}
          className={cn(heading && "mt-4")}
          paragraphClassName="text-base leading-relaxed text-gray-700"
        />
      )}
      {items.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-base leading-relaxed text-gray-700">
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
    <section className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-5">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">{heading}</h3>
      {body && (
        <MarkdownContent
          content={body}
          className="mt-2"
          paragraphClassName="text-sm leading-relaxed text-gray-600"
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
    <section className="space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6">
      <p className="text-xs text-gray-500">Unknown block type: {block.block_type}</p>
      {heading && <h3 className="font-bold text-lg text-gray-900">{heading}</h3>}
      {body && (
        <MarkdownContent
          content={body}
          paragraphClassName="text-base leading-relaxed text-gray-700"
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
  featuredImageUrl?: string | null
  featuredImageAlt?: string | null
}

export function ArticleRenderer({
  document,
  featuredImageUrl: externalFeaturedImageUrl,
  featuredImageAlt: externalFeaturedImageAlt
}: ArticleRendererProps) {
  const seoMeta = document.seo_meta
  const author = document.author
  const featuredImage = document.featured_image
  const blocks = safeArray<ModularBlock>(document.blocks)

  const h1Text = safeString(seoMeta?.h1)
  // Prefer external R2 URL over signed URL from modular_document
  const featuredImageUrl = safeString(externalFeaturedImageUrl) || safeString(featuredImage?.signed_url)
  const featuredImageTitle = safeString(externalFeaturedImageAlt) || safeString(featuredImage?.title_text)
  const authorName = safeString(author?.name)
  const authorBio = safeString(author?.bio)
  const authorProfileImage = safeString(author?.profile_image?.signed_url)
  const authorTwitter = author?.social_urls?.twitter || author?.social_urls?.x
  const authorWebsite = author?.social_urls?.website

  return (
    <div className="mx-auto max-w-5xl">
      {/* Light canvas container for optimal reading */}
      <article className="bg-white rounded-3xl shadow-sm border border-gray-100 px-8 sm:px-12 lg:px-16 py-12 space-y-12">
        {/* Article H1 */}
        {h1Text && (
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
            {h1Text}
          </h1>
        )}

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="overflow-hidden rounded-2xl">
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

        {/* Author Byline */}
        {authorName && (
          <div className="flex items-center gap-5 pb-8 border-b border-gray-100">
            {authorProfileImage ? (
              <img
                src={authorProfileImage}
                alt={authorName}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-base text-gray-900">{authorName}</span>
                {(authorTwitter || authorWebsite) && (
                  <div className="flex items-center gap-2">
                    {authorTwitter && (
                      <a
                        href={authorTwitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-500 transition-colors"
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
                        className="text-gray-400 hover:text-pink-500 transition-colors"
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
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{authorBio}</p>
              )}
            </div>
          </div>
        )}

        {/* Article Blocks */}
        {blocks.map((block, index) => (
          <ArticleBlock key={index} block={block} articleHasH1={!!h1Text} />
        ))}
      </article>
    </div>
  )
}
