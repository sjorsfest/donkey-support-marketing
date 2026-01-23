import { FadeIn } from "~/components/motion"

export function Credibility() {
  return (
    <section className="py-12">
      <div className="section-container">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border-2 border-outline/20">
              <span className="text-xl">⚡</span>
              <span className="font-semibold text-sm">Fast setup</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border-2 border-outline/20">
              <span className="text-xl">🎯</span>
              <span className="font-semibold text-sm">Made for indie devs</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border-2 border-outline/20">
              <span className="text-xl">💬</span>
              <span className="font-semibold text-sm">Slack & Discord</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border-2 border-outline/20">
              <span className="text-xl">🚀</span>
              <span className="font-semibold text-sm">No bloat</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
