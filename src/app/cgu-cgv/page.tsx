'use client'
import React from 'react'
import * as styles from './page.css'

export default function CguCgvPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Conditions Générales d'Utilisation et de Vente</h1>
        <p className={styles.updated}>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Objet</h2>
          <p className={styles.text}>
            Les présentes Conditions Générales d'Utilisation et de Vente (ci-après "CGU-CGV")
            régissent l'utilisation du service CV Beautifier (ci-après "le Service") proposé par CV
            Beautifier (ci-après "nous", "notre" ou "la Société").
          </p>
          <p className={styles.text}>
            Le Service permet aux utilisateurs de générer des CV optimisés pour les systèmes de
            suivi des candidatures (ATS), des lettres de motivation personnalisées et des
            préparations d'entretien grâce à l'intelligence artificielle.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Acceptation des conditions</h2>
          <p className={styles.text}>
            En accédant et en utilisant le Service, vous acceptez d'être lié par les présentes
            CGU-CGV. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Service.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Inscription et compte utilisateur</h2>
          <p className={styles.text}>
            Pour utiliser le Service, vous devez créer un compte en fournissant des informations
            exactes et à jour. Vous êtes responsable de la confidentialité de vos identifiants de
            connexion et de toutes les activités effectuées sous votre compte.
          </p>
          <p className={styles.text}>Vous vous engagez à :</p>
          <ul className={styles.list}>
            <li>Fournir des informations exactes lors de l'inscription</li>
            <li>Maintenir la sécurité de votre mot de passe</li>
            <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Description du service</h2>
          <p className={styles.text}>Le Service propose les fonctionnalités suivantes :</p>
          <ul className={styles.list}>
            <li>Génération de CV optimisés ATS basés sur les offres d'emploi</li>
            <li>Création de lettres de motivation personnalisées</li>
            <li>Préparation d'entretien avec questions et réponses suggérées</li>
            <li>Tableau de bord de suivi des candidatures</li>
            <li>Calcul de score de correspondance entre profil et offre</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Tarification et paiement</h2>
          <p className={styles.text}>
            Le Service fonctionne sur un système de crédits. Chaque génération de CV et lettre de
            motivation consomme un crédit.
          </p>
          <ul className={styles.list}>
            <li>5 crédits gratuits sont offerts à l'inscription</li>
            <li>Des packs de crédits supplémentaires peuvent être achetés</li>
            <li>Les prix sont indiqués en euros TTC</li>
            <li>Le paiement s'effectue par carte bancaire via un prestataire sécurisé</li>
          </ul>
          <p className={styles.text}>
            Les crédits achetés sont valables sans limitation de durée et ne sont pas remboursables.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Propriété intellectuelle</h2>
          <p className={styles.text}>
            Vous conservez tous les droits sur les contenus que vous fournissez au Service
            (informations de profil, expériences, etc.).
          </p>
          <p className={styles.text}>
            Les CV et lettres de motivation générés par le Service vous appartiennent. Vous êtes
            libre de les utiliser, modifier et distribuer comme bon vous semble.
          </p>
          <p className={styles.text}>
            Le Service, son code source, son design et tous les éléments qui le composent restent la
            propriété exclusive de CV Beautifier.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Utilisation acceptable</h2>
          <p className={styles.text}>
            Vous vous engagez à utiliser le Service de manière légale et éthique. Il est interdit de
            :
          </p>
          <ul className={styles.list}>
            <li>Fournir des informations fausses ou trompeuses</li>
            <li>Utiliser le Service pour des activités illégales</li>
            <li>Tenter de contourner les mesures de sécurité du Service</li>
            <li>Revendre ou redistribuer l'accès au Service</li>
            <li>Utiliser des robots ou scripts automatisés sans autorisation</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Protection des données</h2>
          <p className={styles.text}>
            Nous nous engageons à protéger vos données personnelles conformément au RGPD. Les
            informations que vous fournissez sont utilisées uniquement pour :
          </p>
          <ul className={styles.list}>
            <li>Générer vos CV et lettres de motivation</li>
            <li>Améliorer le Service</li>
            <li>Vous contacter concernant votre compte</li>
          </ul>
          <p className={styles.text}>
            Vos données ne sont jamais vendues à des tiers. Pour plus d'informations, consultez
            notre Politique de Confidentialité.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Limitation de responsabilité</h2>
          <p className={styles.text}>
            Le Service est fourni "en l'état". Nous nous efforçons de maintenir un service de
            qualité, mais ne garantissons pas :
          </p>
          <ul className={styles.list}>
            <li>Que le Service sera exempt d'erreurs ou d'interruptions</li>
            <li>Que les CV générés garantiront l'obtention d'un entretien ou d'un emploi</li>
            <li>L'exactitude absolue des suggestions et recommandations</li>
          </ul>
          <p className={styles.text}>
            Vous restez responsable du contenu final de vos candidatures et devez vérifier
            l'exactitude des informations avant envoi.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Droit de rétractation</h2>
          <p className={styles.text}>
            Conformément à la législation européenne, vous disposez d'un délai de 14 jours pour
            exercer votre droit de rétractation après l'achat de crédits, à condition de ne pas
            avoir utilisé ces crédits.
          </p>
          <p className={styles.text}>
            Une fois les crédits utilisés, le droit de rétractation ne peut plus être exercé.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Résiliation</h2>
          <p className={styles.text}>
            Vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil.
            Les crédits non utilisés seront perdus.
          </p>
          <p className={styles.text}>
            Nous nous réservons le droit de suspendre ou résilier votre compte en cas de violation
            des présentes CGU-CGV.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Modifications des CGU-CGV</h2>
          <p className={styles.text}>
            Nous nous réservons le droit de modifier les présentes CGU-CGV à tout moment. Les
            modifications entrent en vigueur dès leur publication sur le site.
          </p>
          <p className={styles.text}>
            En cas de modification substantielle, nous vous en informerons par email.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>13. Loi applicable et juridiction</h2>
          <p className={styles.text}>
            Les présentes CGU-CGV sont régies par le droit français. Tout litige relatif à leur
            interprétation ou exécution relève de la compétence exclusive des tribunaux français.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>14. Contact</h2>
          <p className={styles.text}>
            Pour toute question concernant ces CGU-CGV, vous pouvez nous contacter à :
          </p>
          <p className={styles.text}>Email : contact@cv-beautifier.com</p>
        </section>
      </div>
    </div>
  )
}
