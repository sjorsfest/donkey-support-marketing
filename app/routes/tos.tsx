import type { Route } from "./+types/tos"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { FadeIn } from "~/components/motion"
import { buildBreadcrumbJsonLd, buildMeta } from "~/lib/seo"

const PAGE_PATH = "/tos"
const LAST_UPDATED_ISO = "2026-02-15"
const LAST_UPDATED_LABEL = "15 February 2026"
const PAGE_TITLE = "Terms of Service | Donkey Support"
const PAGE_DESCRIPTION = "Terms of Service for Donkey Support."

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    path: PAGE_PATH,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    ogType: "article",
  })
}

export default function TermsOfService() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: PAGE_PATH },
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
      <main className="py-20">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                Terms of <span className="text-pink-500">Service</span>
              </h1>

              <p className="text-muted mb-8">
                Last updated: <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_LABEL}</time>
              </p>

              <div className="prose prose-lg max-w-none space-y-8">
                <section>
                  <h2 className="font-display text-xl font-bold mb-4">1. Agreement to Terms</h2>
                  <p className="text-muted">
                    By accessing or using Donkey Support ("the Service"), you agree to be bound by these Terms of Service.
                    If you do not agree to these terms, please do not use the Service.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">2. Description of Service</h2>
                  <p className="text-muted">
                    Donkey Support provides a customer support widget that enables website owners to communicate with
                    their visitors through integrations with Slack, Discord, and Telegram. The Service includes the widget code,
                    dashboard, and related tools.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">3. Account Registration</h2>
                  <p className="text-muted">
                    To use certain features of the Service, you must register for an account. You agree to provide
                    accurate, current, and complete information and to keep this information up to date. You are
                    responsible for maintaining the confidentiality of your account credentials.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">4. Acceptable Use</h2>
                  <p className="text-muted mb-4">You agree not to use the Service to:</p>
                  <ul className="list-disc list-inside text-muted space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on the rights of others</li>
                    <li>Send spam or unsolicited communications</li>
                    <li>Distribute malware or harmful code</li>
                    <li>Attempt to gain unauthorised access to the Service or related systems</li>
                    <li>Interfere with the proper functioning of the Service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">5. Intellectual Property</h2>
                  <p className="text-muted">
                    The Service and its original content, features, and functionality are owned by Donkey Support
                    and are protected by international copyright, trademark, and other intellectual property laws.
                    You retain ownership of any content you submit through the Service.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">6. Payment and Subscriptions</h2>
                  <p className="text-muted">
                    Some features of the Service require a paid subscription. Payments are processed securely,
                    and by subscribing you agree to pay the applicable fees. Subscriptions renew automatically
                    unless cancelled before the renewal date. Refunds are handled in accordance with applicable
                    consumer protection laws.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">7. Limitation of Liability</h2>
                  <p className="text-muted">
                    To the maximum extent permitted by applicable law, Donkey Support shall not be liable for any
                    indirect, incidental, special, consequential, or punitive damages, or any loss of profits or
                    revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or
                    other intangible losses resulting from your use of the Service.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">8. Disclaimer of Warranties</h2>
                  <p className="text-muted">
                    The Service is provided "as is" and "as available" without warranties of any kind, either
                    express or implied, including but not limited to implied warranties of merchantability,
                    fitness for a particular purpose, and non-infringement.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">9. Termination</h2>
                  <p className="text-muted">
                    We may terminate or suspend your account and access to the Service immediately, without prior
                    notice, for conduct that we believe violates these Terms or is harmful to other users, us,
                    or third parties, or for any other reason at our sole discretion.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">10. Changes to Terms</h2>
                  <p className="text-muted">
                    We reserve the right to modify these Terms at any time. We will notify users of any material
                    changes by posting the new Terms on this page and updating the "Last updated" date. Your
                    continued use of the Service after any changes constitutes acceptance of the new Terms.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">11. Governing Law</h2>
                  <p className="text-muted">
                    These Terms shall be governed by and construed in accordance with the laws of the European Union
                    and applicable member state laws, without regard to conflict of law provisions. For consumers
                    within the EU, mandatory consumer protection laws of your country of residence shall apply.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">12. Contact</h2>
                  <p className="text-muted">
                    If you have any questions about these Terms, please contact us at using the support widget!
                  </p>
                </section>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  )
}
