import type { Route } from "./+types/contact"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { FadeIn } from "~/components/motion"
import { buildBreadcrumbJsonLd, buildMeta } from "~/lib/seo"

const PAGE_PATH = "/contact"
const PAGE_TITLE = "Contact | Donkey Support"
const PAGE_DESCRIPTION = "Get in touch with Donkey Support through the chat widget or email."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    ogType: "article",
  })
}

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: PAGE_PATH },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
                Contact <span className="text-pink-500">Support</span>
              </h1>

              <div className="mt-6 rounded-xl border-2 border-outline/20 bg-white/50 p-5 sm:p-6">
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  For the fastest response, open the chat widget in the bottom-right corner of your screen.
                </p>
                <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
                  You can also email us at{" "}
                  <a
                    href="mailto:sjors@donkey.support"
                    className="font-semibold text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    sjors@donkey.support
                  </a>
                  .
                </p>
                <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
                  This product was created by sjorsfest.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
