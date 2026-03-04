// Markdown Renderer Component
// Renders markdown content with Tailwind styling

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
        // Headings
        h1: ({ children }) => (
          <h1 className="font-display text-4xl font-bold mb-4 text-foreground">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-display text-3xl font-bold mb-3 mt-8 text-foreground">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mb-2 mt-6 text-foreground">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold mb-2 mt-4 text-foreground">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-lg font-semibold mb-2 mt-3 text-foreground">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-base font-semibold mb-2 mt-3 text-foreground">
            {children}
          </h6>
        ),

        // Paragraphs and text
        p: ({ children }) => (
          <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
        ),
        li: ({ children }) => <li className="text-foreground/80">{children}</li>,

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-pink-500 hover:text-pink-600 underline transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-pink-500 pl-4 italic my-4 text-foreground/70">
            {children}
          </blockquote>
        ),

        // Code
        code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode }) =>
          inline ? (
            <code
              className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="block bg-muted p-4 rounded-lg overflow-x-auto font-mono text-sm text-foreground my-4"
              {...props}
            >
              {children}
            </code>
          ),
        pre: ({ children }) => <pre className="overflow-x-auto">{children}</pre>,

        // Horizontal rule
        hr: () => <hr className="my-8 border-t-2 border-outline/20" />,

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-2 border-outline">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-outline/30">{children}</tr>,
        th: ({ children }) => (
          <th className="px-4 py-3 text-left font-bold text-foreground border-r border-outline/30 last:border-r-0">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-foreground/80 border-r border-outline/30 last:border-r-0">
            {children}
          </td>
        ),

        // Strong/bold
        strong: ({ children }) => (
          <strong className="font-bold text-foreground">{children}</strong>
        ),

        // Emphasis/italic
        em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
