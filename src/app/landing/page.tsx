'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as styles from './page.css'
import { CTAButton } from '@/app/components'

// Landing page components
import {
  HowItWorks,
  ContentContainer,
  ValuePropsATS,
  InterviewPrep,
  DashboardSection,
  FreeCreditsCTA,
  TestimonialsCarousel,
} from '@/app/components/landing'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className={styles.landingContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContainer}>
          {/* Hero section */}
          <section className={styles.heroSection}>
            <h1 className={styles.mainTitle}>
              Décroche le job de tes
              <br />
              rêves grâce à l'IA
              <Image
                src="/catch_phrase_sparkle.svg"
                alt="Icône étincelle"
                width={48}
                height={48}
                className={styles.sparkle}
              />
              !
            </h1>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <Image
                  src="/catch_phrase_sparkle.svg"
                  alt="Icône"
                  width={24}
                  height={24}
                  className={styles.featureIcon}
                />
                Génère des CV et lettres de motivation personnalisées à chaque offre d'emploi
              </li>
              <li className={styles.featureItem}>
                <Image
                  src="/catch_phrase_sparkle.svg"
                  alt="Icône"
                  width={24}
                  height={24}
                  className={styles.featureIcon}
                />
                Utilise des templates optimisés pour les ATS (Applicant Tracking Systems)
              </li>
              <li className={styles.featureItem}>
                <Image
                  src="/catch_phrase_sparkle.svg"
                  alt="Icône"
                  width={24}
                  height={24}
                  className={styles.featureIcon}
                />
                Booste tes candidatures avec des contenus adaptés à chaque poste
              </li>

              <li className={styles.ctaSection}>
                <CTAButton onClick={() => router.push('/login')}>
                  Commencer
                  <Image
                    src="/arrow-right.svg"
                    alt="Flèche vers la droite"
                    width={24}
                    height={24}
                  />
                </CTAButton>
              </li>
            </ul>
          </section>

          <ContentContainer>
            <HowItWorks />
            <ValuePropsATS />
            <InterviewPrep />
          </ContentContainer>
          <DashboardSection />
          <FreeCreditsCTA onClick={() => router.push('/login')} />
          <TestimonialsCarousel />
        </div>
      </div>
    </div>
  )
}
