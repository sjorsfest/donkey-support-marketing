import type { Route } from "./+types/privacy-policy"
import { Navbar } from "~/components/layout/navbar"
import { Footer } from "~/components/layout/footer"
import { FadeIn } from "~/components/motion"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - Donkey Support" },
    {
      name: "description",
      content: "Privacy Policy for Donkey Support - Learn how we collect, use, and protect your data.",
    },
  ]
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="py-20">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                Privacy <span className="text-pink-500">Policy</span>
              </h1>

              <p className="text-muted mb-8">
                Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>

              <div className="prose prose-lg max-w-none space-y-8">
                <section>
                  <h2 className="font-display text-xl font-bold mb-4">1. Introduction</h2>
                  <p className="text-muted">
                    Donkey Support ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your information when you use our customer
                    support widget service. This policy complies with the General Data Protection Regulation (GDPR)
                    and other applicable European data protection laws.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">2. Data Controller</h2>
                  <p className="text-muted">
                    Donkey Support acts as the data controller for personal data collected through our website and
                    service. For data processed on behalf of our customers through the support widget, we act as a
                    data processor.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">3. Information We Collect</h2>
                  <p className="text-muted mb-4">We may collect the following types of information:</p>
                  <ul className="list-disc list-inside text-muted space-y-2">
                    <li><strong>Account Information:</strong> Email address, name, and password when you register</li>
                    <li><strong>Usage Data:</strong> Information about how you use our Service, including pages visited and features used</li>
                    <li><strong>Communication Data:</strong> Messages sent through the support widget</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
                    <li><strong>Payment Information:</strong> Billing details processed securely through our payment provider</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">4. Legal Basis for Processing</h2>
                  <p className="text-muted mb-4">We process your personal data based on the following legal grounds:</p>
                  <ul className="list-disc list-inside text-muted space-y-2">
                    <li><strong>Contract:</strong> To provide and maintain our Service as per our agreement with you</li>
                    <li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities</li>
                    <li><strong>Legitimate Interests:</strong> To improve our Service and ensure security</li>
                    <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">5. How We Use Your Information</h2>
                  <p className="text-muted mb-4">We use your information to:</p>
                  <ul className="list-disc list-inside text-muted space-y-2">
                    <li>Provide, operate, and maintain our Service</li>
                    <li>Process transactions and send related information</li>
                    <li>Send administrative information, updates, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Monitor and analyse usage patterns to improve our Service</li>
                    <li>Detect, prevent, and address technical issues and fraud</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">6. Data Retention</h2>
                  <p className="text-muted">
                    We retain your personal data only for as long as necessary to fulfil the purposes for which it
                    was collected, including to satisfy legal, accounting, or reporting requirements. When data is
                    no longer needed, it will be securely deleted or anonymised.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">7. Data Sharing and Transfers</h2>
                  <p className="text-muted mb-4">We may share your information with:</p>
                  <ul className="list-disc list-inside text-muted space-y-2">
                    <li><strong>Service Providers:</strong> Third parties who assist in operating our Service (hosting, payment processing)</li>
                    <li><strong>Integration Partners:</strong> Slack and Discord for message delivery, as authorised by you</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  </ul>
                  <p className="text-muted mt-4">
                    If we transfer data outside the European Economic Area (EEA), we ensure appropriate safeguards
                    are in place, such as Standard Contractual Clauses or adequacy decisions.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">8. Your Rights Under GDPR</h2>
                  <p className="text-muted mb-4">As a data subject, you have the following rights:</p>
                  <ul className="list-disc list-inside text-muted space-y-2">
                    <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                    <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                    <li><strong>Right to Restriction:</strong> Request limitation of processing of your data</li>
                    <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format</li>
                    <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                  </ul>
                  <p className="text-muted mt-4">
                    To exercise any of these rights, please contact us at the email address below. We will respond
                    to your request within 30 days.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">9. Cookies</h2>
                  <p className="text-muted">
                    We use cookies and similar tracking technologies to enhance your experience. Essential cookies
                    are necessary for the Service to function. Analytics cookies help us understand how visitors
                    use our site. You can manage cookie preferences through your browser settings. For detailed
                    information, please see our cookie banner when you first visit our site.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">10. Security</h2>
                  <p className="text-muted">
                    We implement appropriate technical and organisational measures to protect your personal data
                    against unauthorised access, alteration, disclosure, or destruction. However, no method of
                    transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">11. Children's Privacy</h2>
                  <p className="text-muted">
                    Our Service is not directed to individuals under the age of 16. We do not knowingly collect
                    personal data from children. If you become aware that a child has provided us with personal
                    data, please contact us.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">12. Changes to This Policy</h2>
                  <p className="text-muted">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by
                    posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage
                    you to review this policy periodically.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">13. Supervisory Authority</h2>
                  <p className="text-muted">
                    If you are located in the European Economic Area and believe we have not adequately addressed
                    your concerns, you have the right to lodge a complaint with your local data protection
                    supervisory authority.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-bold mb-4">14. Contact Us</h2>
                  <p className="text-muted">
                    If you have any questions about this Privacy Policy or wish to exercise your rights, please
                    contact us at{" "}
                    <a href="mailto:privacy@donkeysupport.com" className="text-pink-500 hover:underline">
                      privacy@donkeysupport.com
                    </a>
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
