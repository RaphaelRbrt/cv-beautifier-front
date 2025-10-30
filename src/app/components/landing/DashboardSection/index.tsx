'use client'
import React from 'react'
import Image from 'next/image'
import * as styles from './styles.css'

export function DashboardSection() {
  return (
    <section className={styles.sectionContainer} aria-labelledby="dashboard-title">
      <div className={styles.headerBlock}>
        <h2 id="dashboard-title" className={styles.title}>
          Ton tableau de bord de candidatures
        </h2>
        <p className={styles.subtitle}>
          Tout est centralisé : offres, CV générés, lettres, questions d’entretien, notes sur
          l’entreprise… Tu sais où tu en es pour chaque poste, sans Excel bricolé.
        </p>
      </div>

      <div className={styles.dashboardCard}>
        {/* header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.jobLine}>
            <div className={styles.jobTitle}>Data Analyst · Lyon (CDI)</div>
            <span className={styles.statusBadge}>Envoyé</span>
          </div>

          <div className={styles.metaLine}>
            <span className={styles.metaItem}>
              <Image
                src="/calendar.svg"
                alt=""
                width={16}
                height={16}
                className={styles.metaIcon}
              />
              Candidature du 28/10
            </span>
            <span className={styles.metaItem}>
              <Image src="/match.svg" alt="" width={16} height={16} className={styles.metaIcon} />
              Match score : <strong className={styles.scoreText}>92%</strong>
            </span>
            <span className={styles.metaItem}>
              <Image src="/company.svg" alt="" width={16} height={16} className={styles.metaIcon} />
              Entreprise : NovaMetrics
            </span>
          </div>
        </div>

        {/* body */}
        <div className={styles.dashboardBody}>
          <div className={styles.col}>
            <div className={styles.colTitle}>CV généré</div>
            <div className={styles.colContent}>
              <p className={styles.colText}>Version “Analyste Data orienté business impact”</p>
              <button className={styles.linkBtn}>Voir le CV</button>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Lettre de motivation</div>
            <div className={styles.colContent}>
              <p className={styles.colText}>Pitch aligné avec les enjeux BI / dashboard KPI</p>
              <button className={styles.linkBtn}>Voir la lettre</button>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Prépa entretien</div>
            <div className={styles.colContent}>
              <p className={styles.colText}>12 questions probables + réponses prêtes</p>
              <button className={styles.linkBtn}>Réviser maintenant</button>
            </div>
          </div>
        </div>

        <div className={styles.footerNote}>
          Historique illimité de toutes tes candidatures. Tu ne perds plus une opportunité.
        </div>
      </div>
    </section>
  )
}
