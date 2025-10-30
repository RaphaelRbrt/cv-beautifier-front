'use client'
import React from 'react'
import Image from 'next/image'
import * as styles from './styles.css'

type FreeCreditsCTAProps = {
  onClick?: () => void
}

export function FreeCreditsCTA({ onClick }: FreeCreditsCTAProps) {
  return (
    <section className={styles.sectionContainer} aria-labelledby="free-credits-title">
      <div className={styles.innerCard}>
        <div className={styles.left}>
          <h2 id="free-credits-title" className={styles.title}>
            Teste gratuitement
          </h2>
          <p className={styles.subtitle}>
            5 crédits offerts dès l’inscription.
            <br />
            Aucune carte bancaire demandée.
          </p>

          <button className={styles.ctaBtn} onClick={onClick}>
            Créer mon compte
            <Image
              src="/arrow-right.svg"
              alt="Flèche"
              width={20}
              height={20}
              className={styles.ctaIcon}
            />
          </button>

          <p className={styles.trustText}>
            ➜ Génére ton premier CV optimisé ATS en moins de 2 minutes.
          </p>
        </div>

        <div className={styles.right} aria-hidden="true">
          <div className={styles.statBlock}>
            <div className={styles.statNumber}>+70%</div>
            <div className={styles.statLabel}>
              de chances en plus d’être lu
              <br />
              (CV lisible par ATS)
            </div>
          </div>

          <div className={styles.statBlock}>
            <div className={styles.statNumber}>95%</div>
            <div className={styles.statLabel}>
              score de match moyen
              <br />
              sur les offres ciblées
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
