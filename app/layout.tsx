import type { Metadata } from 'next'
import './globals.css'

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
