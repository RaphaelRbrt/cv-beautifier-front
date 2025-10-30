'use client'
import React from 'react'
import Image from 'next/image'
import * as styles from './styles.css'

const REVIEWS = [
  {
    name: 'Clara, Product Designer',
    message: 'Le CV généré passait nickel dans l’ATS. 3 entretiens bookés en 1 semaine.',
    avatar: '/avatar-f1.svg',
  },
  {
    name: 'Mathis, Data Analyst',
    message:
      'Le score de match à 94% m’a fait passer de “candidature ignorée” à “on veut te parler demain”.',
    avatar: '/avatar-m1.svg',
  },
  {
    name: 'Sarah, Marketing Manager',
    message: 'La préparation d’entretien est ouf. J’avais déjà mes réponses prêtes, zéro stress.',
    avatar: '/avatar-f2.svg',
  },
  {
    name: 'Ibrahim, Développeur Full-Stack',
    message: 'J’ai juste collé l’offre, et bim : CV + lettre + questions entretien. Grosse claque.',
    avatar: '/avatar-m2.svg',
  },
]

export function TestimonialsCarousel() {
  // On duplique la liste pour l’effet boucle infinie
  const items = [...REVIEWS, ...REVIEWS]

  return (
    <section className={styles.sectionContainer} aria-labelledby="temoignages-title">
      <h2 id="temoignages-title" className={styles.title}>
        Ils ont utilisé l’IA pour booster leur recherche d’emploi
      </h2>
      <p className={styles.subtitle}>
        Témoignages de candidats qui ont déjà envoyé des candidatures optimisées ATS et obtenu des
        entretiens rapides.
      </p>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeInner}>
          {items.map((r, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={r.avatar}
                    alt={`Avatar ${r.name}`}
                    width={40}
                    height={40}
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.personBlock}>
                  <div className={styles.personName}>{r.name}</div>
                  <div className={styles.personVerified}>
                    <Image
                      src="/check-badge.svg"
                      alt=""
                      width={16}
                      height={16}
                      className={styles.verifiedIcon}
                    />
                    Profil vérifié
                  </div>
                </div>
              </div>

              <p className={styles.reviewText}>&ldquo;{r.message}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
