'use client'
import React from 'react'
import Image from 'next/image'
import * as styles from './styles.css'

export function InterviewPrep() {
  return (
    <section className={styles.sectionContainer} aria-labelledby="prep-entretien-title">
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <h2 id="prep-entretien-title" className={styles.title}>
            Prêt(e) pour l’entretien, avant même d’être contacté(e)
          </h2>

          <p className={styles.subtitle}>
            À la fin de chaque génération, tu reçois un pack de préparation d’entretien sur mesure :
            les questions probables du recruteur + des réponses argumentées basées sur ton propre
            parcours. Tu arrives confiant le jour J.
          </p>

          <ul className={styles.bullets}>
            <li className={styles.bulletItem}>
              <Image src="/check.svg" alt="" width={20} height={20} className={styles.bulletIcon} />
              Questions techniques et comportementales probables
            </li>
            <li className={styles.bulletItem}>
              <Image src="/check.svg" alt="" width={20} height={20} className={styles.bulletIcon} />
              Réponses personnalisées qui valorisent TES expériences
            </li>
            <li className={styles.bulletItem}>
              <Image src="/check.svg" alt="" width={20} height={20} className={styles.bulletIcon} />
              “Pourquoi toi ?” → pitch déjà rédigé
            </li>
          </ul>
        </div>

        <div className={styles.cardPreview} aria-hidden="true">
          <div className={styles.previewHeader}>
            <span className={styles.previewBadge}>Coaching IA Entretien</span>
            <span className={styles.previewJob}>Product Manager • SaaS B2B</span>
          </div>

          <div className={styles.qaBlock}>
            <div className={styles.qLabel}>Question probable :</div>
            <div className={styles.qText}>
              « Parle-moi d’une fonctionnalité que tu as lancée et qui a créé de l’impact mesurable.
              »
            </div>

            <div className={styles.aLabel}>Ta meilleure réponse :</div>
            <div className={styles.aText}>
              “Chez X, j’ai piloté le lancement du dashboard d’usage client. Résultat : +32%
              d’activation en 2 mois. Mon rôle : définir la roadmap, prioriser avec les devs, puis
              tester le wording côté Sales pour aligner le message valeur.”
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
