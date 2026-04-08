import HeroSection from '@/components/HeroSection'
import BandFinderSection from '@/components/BandFinderSection'
import StatsBar from '@/components/StatsBar'
import TrustedBy from '@/components/TrustedBy'
import KuenstlerpoolSection from '@/components/KuenstlerpoolSection'
import BandGrid from '@/components/BandGrid'
import UspSection from '@/components/UspSection'
import KontaktCta from '@/components/KontaktCta'
import VmpFooter from '@/components/VmpFooter'

export default function HomePage() {
  return (
    <main>
      {/* 1 — Hero (Logo + Nav + Content + Image Strip) */}
      <HeroSection />

      {/* 2 — Stats Bar */}
      <StatsBar />

      {/* 3 — Trusted By */}
      <TrustedBy />

      {/* 4 — Band Finder */}
      <BandFinderSection />

      {/* 5 — Künstlerpool / Kategorien */}
      <KuenstlerpoolSection />

      {/* 5 — Band Grid */}
      <BandGrid />

      {/* 6 — USP Section */}
      <UspSection />

      {/* 7 — Kontakt CTA */}
      <KontaktCta />

      {/* 8 — Footer */}
      <VmpFooter />
    </main>
  )
}
