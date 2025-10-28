import { Funnel_Display, Funnel_Sans } from 'next/font/google'

export const funnelDisplay = Funnel_Display({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-funnel-display',
  display: 'swap',
})

export const funnelSans = Funnel_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-funnel-sans',
  display: 'swap',
})
