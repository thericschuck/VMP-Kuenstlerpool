import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import BandFinderSection from '@/components/BandFinderSection'
import StatsBar from '@/components/StatsBar'
import TrustedBy from '@/components/TrustedBy'
import BandShowcase from '@/components/BandShowcase'
import UspSection from '@/components/UspSection'
import KontaktCta from '@/components/KontaktCta'
import VmpFooter from '@/components/VmpFooter'

export default function HomePage() {
  return (
    <main>
      {/* 1 — Navbar */}
      <Navbar />

      {/* 2 — Hero (Logo + Nav + Content + Image Strip) */}
      <HeroSection />

      {/* 2 — Stats Bar */}
      <StatsBar />

      {/* 3 — Trusted By */}
      <TrustedBy />

      {/* 4 — Band Finder */}
      <BandFinderSection />

      {/* 5 — Band Showcase */}
      <BandShowcase />

      {/* 6 — USP Section */}
      <UspSection />

      {/* 7 — Kontakt CTA */}
      <KontaktCta />

      {/* 8 — Footer */}
      <VmpFooter />
    </main>
  )
}
