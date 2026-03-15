import type { Metadata } from 'next'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Vivid Music Productions – Livemusik im Rhein-Main-Gebiet',
  description:
    'Seit 20 Jahren Ihr Partner für unvergessliche Live-Events. 10 Bands in den Kategorien Easy Listening, Partybands und Tribute Bands.',
  metadataBase: new URL('https://v-m-p.de'),
  openGraph: {
    title: 'Vivid Music Productions',
    description:
      'Livemusik auf höchstem Niveau – seit 20 Jahren Ihr Partner für unvergessliche Events.',
    type: 'website',
    locale: 'de_DE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
