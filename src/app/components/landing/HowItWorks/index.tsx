'use client'

import React from 'react'
import Image from 'next/image'
import * as styles from './styles.css'

/**
 * HowItWorks component - Displays the 3-step process
 * Clean, reusable component for the landing page
 */
export const HowItWorks: React.FC = () => {
  return (
    <section className={styles.stepsIntroBlock} aria-labelledby="comment-ca-marche">
      <h2 id="comment-ca-marche" className={styles.stepsIntroTitle}>
        Comment ça marche ?
      </h2>
      <p className={styles.stepsIntroSubtitle}>
        En trois étapes simples, transforme chaque offre d'emploi en une candidature percutante,
        optimisée pour les recruteurs et les ATS.
      </p>

      <div className={styles.stepsContainer}>
        {/* Step 1 */}
        <div className={styles.stepCard}>
          <span className={styles.stepBadge}>Étape 1</span>
          <Image
            src="/step1.svg"
            alt="Étape 1"
            width={64}
            height={64}
            className={styles.stepIcon}
          />
          <h3 className={styles.stepTitle}>Copie-colle ton offre d'emploi</h3>

          <div className={styles.exampleCardWrapper}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleTitle}>
                <Image
                  src="/step1.svg"
                  alt="Icône offre d'emploi"
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
            alt="Étape 2"
            width={64}
            height={64}
            className={styles.stepIcon}
          />
          <h3 className={styles.stepTitle}>L'IA en action</h3>

          <div className={styles.exampleCardWrapper}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleTitle}>
                <Image
                  src="/step2.svg"
                  alt="Icône IA"
                  width={28}
                  height={28}
                  className={styles.exampleIcon}
                />
                Analyse et personnalisation
              </div>
              <div className={styles.exampleDetails}>
                Nous relions ton profil, tes expériences et les mots-clés de l'offre pour générer un
                CV ultra ciblé et une lettre de motivation crédible.
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className={styles.stepCard}>
          <span className={styles.stepBadge}>Étape 3</span>
          <Image
            src="/step3.svg"
            alt="Étape 3"
            width={64}
            height={64}
            className={styles.stepIcon}
          />
          <h3 className={styles.stepTitle}>Récupère ta candidature</h3>

          <div className={styles.exampleCardWrapper}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleTitle}>
                <Image
                  src="/step3.svg"
                  alt="Icône CV optimisé ATS"
                  width={28}
                  height={28}
                  className={styles.exampleIcon}
                />
                CV Optimisé ATS + Lettre personnalisée
              </div>
              <div className={styles.exampleDetails}>
                <span className={styles.matchBadge}>95% de match</span>
                <br />
                Format lisible par les ATS + formulation orientée recruteur humain.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
