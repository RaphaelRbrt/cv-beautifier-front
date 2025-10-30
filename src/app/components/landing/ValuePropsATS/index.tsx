'use client'
import React from 'react'
import Image from 'next/image'
import * as styles from './styles.css'

export function ValuePropsATS() {
  return (
    <section className={styles.section} aria-labelledby="ats-section-title">
      <div className={styles.header}>
        <h2 id="ats-section-title" className={styles.title}>
          Un CV qui passe les robots
          <span className={styles.gradientText}> et atteint les recruteurs</span>
        </h2>
        <p className={styles.subtitle}>
          On optimise automatiquement ton CV pour les ATS (Applicant Tracking Systems) + on améliore
          ton "match score" pour l'offre ciblée. Résultat : plus de chances d'être lu, plus
          d'entretiens.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icon-ats-check.svg"
              alt="Icône compatibilité ATS"
              width={32}
              height={32}
              className={styles.icon}
            />
          </div>
          <h3 className={styles.cardTitle}>Compatible ATS</h3>
          <p className={styles.cardText}>
            Mise en page propre, mots-clés structurés, rubriques normalisées : ton CV ne se fait pas
            bloquer par les filtres automatiques. Les informations clés (skills, expériences,
            résultats) sont extraites et comprises.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icon-target.svg"
              alt="Icône score de correspondance"
              width={32}
              height={32}
              className={styles.icon}
            />
          </div>
          <h3 className={styles.cardTitle}>Score de correspondance</h3>
          <p className={styles.cardText}>
            On analyse l'offre d'emploi et ton profil pour calculer un{' '}
            <strong className={styles.highlight}>match score</strong>. Ensuite on réécrit ton CV
            pour maximiser ce score sans mentir ni inventer : juste mettre en avant ce qui compte
            vraiment pour le poste.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icon-eye.svg"
              alt="Icône visibilité recruteur"
              width={32}
              height={32}
              className={styles.icon}
            />
          </div>
          <h3 className={styles.cardTitle}>Vu par un humain</h3>
          <p className={styles.cardText}>
            Après l'ATS, il reste le recruteur. Chaque CV est relu par l'IA pour être clair,
            crédible et orienté impact ("j'ai livré X", "j'ai augmenté Y"), pas du blabla générique.
          </p>
        </div>
      </div>
    </section>
  )
}
