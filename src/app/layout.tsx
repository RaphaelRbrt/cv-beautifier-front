import './styles/tokens.css'
import './styles/global.css'

import React from 'react'
import { Providers } from './store/Providers'
import * as styles from './layout.css'
import { Navigation, GlobalErrors, Footer } from './components'
import { funnelDisplay, funnelSans } from './fonts'
import { Background } from './components/Background'

export const metadata = {
  title: 'Générateur de CV compatible ATS | Lettre de motivation & préparation entretien IA',
  description:
    "Génère un CV optimisé ATS et une lettre de motivation unique pour chaque offre d'emploi. Obtiens ton score de correspondance, prépare ton entretien et suis toutes tes candidatures sur un tableau de bord. 5 crédits offerts, sans carte bancaire.",
  alternates: {
    canonical: 'https://cv-beautifier.com/',
  },
  openGraph: {
    title: 'CV optimisé ATS + coaching entretien IA | 5 crédits offerts (sans CB)',
    description:
      "Copie l'offre d'emploi, reçois un CV compatible ATS, une lettre de motivation ciblée et des réponses prêtes pour l'entretien.",
    type: 'website',
    url: 'https://cv-beautifier.com/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${funnelDisplay.variable} ${funnelSans.variable}`}>
      <body className={styles.bodyWrapper}>
        <Background />
        <div className={styles.contentLayer}>
          <Providers>
            <Navigation />
            <GlobalErrors />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
