import './styles/tokens.css'
import './styles/global.css'
import { Providers } from './store/Providers'
import React from 'react'
import Image from 'next/image'
import * as styles from './layout.css'
import { Navigation, GlobalErrors } from './components'
import { funnelDisplay, funnelSans } from './fonts'

export const metadata = {
  title: 'CV Beautifier',
  description: 'CV Beautifier Frontend',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${funnelDisplay.variable} ${funnelSans.variable}`}>
      <body className={styles.bodyWrapper}>
        <Image
          src="/background.png"
          alt="Background"
          fill
          className={styles.backgroundImage}
          priority
        />
        <div className={styles.contentLayer}>
          <Providers>
            <Navigation />
            <GlobalErrors />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
