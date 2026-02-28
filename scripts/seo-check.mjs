import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const MARKETING_ROUTES = [
  { path: "/", file: "app/routes/home.tsx", h1File: "app/components/sections/hero.tsx" },
  {
    path: "/discord-communities",
    file: "app/routes/discord-communities.tsx",
    h1File: "app/components/sections/discord-communities-hero.tsx",
  },
  {
    path: "/open-source",
    file: "app/routes/open-source.tsx",
    h1File: "app/components/sections/open-source-hero.tsx",
  },
  {
    path: "/indie-games",
    file: "app/routes/indie-games.tsx",
    h1File: "app/components/sections/indie-games-hero.tsx",
  },
  {
    path: "/agencies",
    file: "app/routes/agencies.tsx",
    h1File: "app/components/sections/agencies-hero.tsx",
  },
  {
    path: "/non-technical-founders",
    file: "app/routes/non-technical-founders.tsx",
    h1File: "app/components/sections/non-technical-founders-hero.tsx",
  },
]

const LEGAL_ROUTES = [
  { path: "/privacy-policy", file: "app/routes/privacy-policy.tsx", h1File: "app/routes/privacy-policy.tsx" },
  { path: "/tos", file: "app/routes/tos.tsx", h1File: "app/routes/tos.tsx" },
]

const INDEXABLE_ROUTES = [...MARKETING_ROUTES, ...LEGAL_ROUTES]
const KNOWN_INTERNAL_PATHS = new Set([
  ...INDEXABLE_ROUTES.map((route) => route.path),
  "/go",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
])
const CANONICAL_HOST = "https://www.donkey.support"
const TITLE_RANGE_MARKETING = { min: 50, max: 60 }
const TITLE_RANGE_LEGAL = { min: 20, max: 60 }
const DESCRIPTION_MAX = 160

const errors = []

function read(file) {
  return readFileSync(file, "utf8")
}

function extractConst(content, constName) {
  const match = content.match(new RegExp(`const\\s+${constName}\\s*=\\s*"([^"]+)"`))
  return match?.[1] ?? null
}

function countTag(content, tagName) {
  return (content.match(new RegExp(`<${tagName}(\\s|>)`, "g")) ?? []).length
}

function checkRouteMeta() {
  for (const route of INDEXABLE_ROUTES) {
    const content = read(route.file)

    if (!content.includes("buildMeta(")) {
      errors.push(`${route.file}: route does not use buildMeta()`)
    }

    const title = extractConst(content, "PAGE_TITLE")
    if (!title) {
      errors.push(`${route.file}: missing PAGE_TITLE constant`)
    } else {
      const limits = MARKETING_ROUTES.some((r) => r.file === route.file)
        ? TITLE_RANGE_MARKETING
        : TITLE_RANGE_LEGAL
      if (title.length < limits.min || title.length > limits.max) {
        errors.push(
          `${route.file}: title length ${title.length} outside expected range ${limits.min}-${limits.max}`,
        )
      }
    }

    const description = extractConst(content, "PAGE_DESCRIPTION")
    if (!description) {
      errors.push(`${route.file}: missing PAGE_DESCRIPTION constant`)
    } else if (description.length > DESCRIPTION_MAX) {
      errors.push(
        `${route.file}: description length ${description.length} exceeds ${DESCRIPTION_MAX}`,
      )
    }
  }
}

function checkCanonicalHostUsage() {
  const allRouteFiles = readdirSync("app/routes")
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => join("app/routes", file))

  for (const file of allRouteFiles) {
    const content = read(file)
    if (content.includes("https://donkey.support")) {
      errors.push(`${file}: found non-www canonical host usage (https://donkey.support)`)
    }
  }

  const seoLib = read("app/lib/seo.ts")
  if (!seoLib.includes(`const CANONICAL_ORIGIN = "${CANONICAL_HOST}"`)) {
    errors.push("app/lib/seo.ts: canonical host constant is not https://www.donkey.support")
  }
}

function checkImageAltAttributes() {
  const files = []
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        files.push(fullPath)
      }
    }
  }
  walk("app")

  for (const file of files) {
    const content = read(file)
    const imgTags = content.match(/<img[\s\S]*?>/g) ?? []
    for (const tag of imgTags) {
      if (!/\salt=/.test(tag)) {
        errors.push(`${file}: img tag missing alt attribute`)
        continue
      }

      const altMatch = tag.match(/\salt="([^"]*)"/)
      const altValue = altMatch?.[1]
      if (altValue === "" && !/\saria-hidden="true"/.test(tag)) {
        errors.push(`${file}: decorative img with empty alt must include aria-hidden="true"`)
      }
    }
  }
}

function checkSitemapCoverage() {
  const content = read("app/routes/sitemap[.]xml.tsx")
  const sitemapPaths = [...content.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1])
  const missing = INDEXABLE_ROUTES.map((r) => r.path).filter((path) => !sitemapPaths.includes(path))

  if (missing.length > 0) {
    errors.push(`app/routes/sitemap[.]xml.tsx: missing indexable paths: ${missing.join(", ")}`)
  }
}

function checkInternalLinks() {
  const files = []
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        files.push(fullPath)
      }
    }
  }
  walk("app")

  for (const file of files) {
    const content = read(file)
    const hrefMatches = [...content.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1])
    for (const href of hrefMatches) {
      if (href.startsWith("http://") || href.startsWith("https://")) {
        continue
      }
      if (href.startsWith("#") || href.startsWith("/#")) {
        continue
      }

      const basePath = href.split("#")[0].split("?")[0]
      if (!KNOWN_INTERNAL_PATHS.has(basePath)) {
        errors.push(`${file}: href points to unknown internal path "${href}"`)
      }
    }
  }
}

function checkHeadingStructure() {
  for (const route of INDEXABLE_ROUTES) {
    const content = read(route.h1File)
    const h1Count = countTag(content, "h1")
    if (h1Count !== 1) {
      errors.push(`${route.h1File}: expected exactly 1 <h1>, found ${h1Count}`)
    }
  }

  const sectionFiles = readdirSync("app/components/sections")
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => join("app/components/sections", file))

  for (const file of sectionFiles) {
    const content = read(file)
    const headingLevels = [...content.matchAll(/<h([1-6])(\s|>)/g)].map((match) =>
      Number(match[1]),
    )

    for (let i = 1; i < headingLevels.length; i += 1) {
      const prev = headingLevels[i - 1]
      const current = headingLevels[i]
      if (current - prev > 1) {
        errors.push(`${file}: heading level jumps from h${prev} to h${current}`)
      }
    }
  }
}

checkRouteMeta()
checkCanonicalHostUsage()
checkImageAltAttributes()
checkSitemapCoverage()
checkInternalLinks()
checkHeadingStructure()

if (errors.length > 0) {
  console.error("SEO checks failed:")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log("SEO checks passed.")
