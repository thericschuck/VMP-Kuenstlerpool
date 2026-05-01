import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import BandFinderSection from '@/components/BandFinderSection'
import UspSection from '@/components/UspSection'
import KontaktCta from '@/components/KontaktCta'
import VmpFooter from '@/components/VmpFooter'

export default function HomePage() {
  return (
    <main>
      {/* 1 — Navbar */}
      <Navbar />

      {/* 2 — Hero */}
      <HeroSection />

      {/* 3 — Stats Bar (Gebucht von + Kategorie-Chips) */}
      <StatsBar />

      {/* 4 — Band Finder + Band der Woche */}
      <BandFinderSection />

      {/* 5 — Social Media */}
      <UspSection />

      {/* 6 — Kontakt */}
      <KontaktCta />

      {/* 7 — Footer */}
      <VmpFooter />
    </main>
  )
}
