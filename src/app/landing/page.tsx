'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as styles from './page.css'
import { CTAButton } from '@/app/components'

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
                alt="sparkle"
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
                  alt="icon"
                  width={24}
                  height={24}
                  className={styles.featureIcon}
                />
                Personnalise ton profil afin de gnegnegne
              </li>
              <li className={styles.featureItem}>
                <Image
                  src="/catch_phrase_sparkle.svg"
                  alt="icon"
                  width={24}
                  height={24}
                  className={styles.featureIcon}
                />
                Génère des CV et lettres de motivation personnalisées à chaque offre d'emploi
              </li>
              <li className={styles.featureItem}>
                <Image
                  src="/catch_phrase_sparkle.svg"
                  alt="icon"
                  width={24}
                  height={24}
                  className={styles.featureIcon}
                />
                Utilise des templates qui passent les ATS checker
              </li>
            </ul>
          </section>

          {/* Steps section */}
          <div className={styles.stepsContainer}>
            {/* Step 1 */}
            <div className={styles.stepCard}>
              <span className={styles.stepBadge}>Étape 1</span>
              <Image
                src="/step1.svg"
                alt="Step 1"
                width={64}
                height={64}
                className={styles.stepIcon}
              />
              <h3 className={styles.stepTitle}>Copie-colle ton offre d'emploi</h3>

              <div className={`${styles.exampleCardWrapper}`}>
                <div className={`${styles.exampleCard}`}>
                  <div className={styles.exampleTitle}>
                    <Image
                      src="/step1.svg"
                      alt="icon"
                      width={28}
                      height={28}
                      className={styles.exampleIcon}
                    />
                    Développeur Full-Stack Senior
                  </div>
                  <div className={styles.exampleDetails}>
                    React • Node.js • TypeScript
                    <br />
                    CDI • Paris • 55-75k€
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={styles.stepCard}>
              <span className={styles.stepBadge}>Étape 2</span>
              <Image
                src="/step2.svg"
                alt="Step 2"
                width={64}
                height={64}
                className={styles.stepIcon}
              />
              <h3 className={styles.stepTitle}>L'IA en action</h3>

              <div className={`${styles.exampleCardWrapper}`}>
                <div className={`${styles.exampleCard}`}>
                  <div className={styles.exampleTitle}>
                    <Image
                      src="/step2.svg"
                      alt="icon"
                      width={28}
                      height={28}
                      className={styles.exampleIcon}
                    />
                    Analyse et personnalisation
                  </div>
                  <div className={styles.exampleDetails}>
                    Description
                    <br />
                    description
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={styles.stepCard}>
              <span className={styles.stepBadge}>Étape 3</span>
              <Image
                src="/step3.svg"
                alt="Step 3"
                width={64}
                height={64}
                className={styles.stepIcon}
              />
              <h3 className={styles.stepTitle}>Récupère ta candidature</h3>

              <div className={`${styles.exampleCardWrapper}`}>
                <div className={`${styles.exampleCard}`}>
                  <div className={styles.exampleTitle}>
                    <Image
                      src="/step3.svg"
                      alt="icon"
                      width={28}
                      height={28}
                      className={styles.exampleIcon}
                    />
                    CV Optimisé ATS + Lettre personnalisée
                  </div>
                  <div className={styles.exampleDetails}>
                    <span className={styles.matchBadge}>95% de match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <section className={styles.ctaSection}>
            <CTAButton onClick={() => router.push('/login')}>Commencer</CTAButton>
          </section>
        </div>
      </div>
    </div>
  )
}
