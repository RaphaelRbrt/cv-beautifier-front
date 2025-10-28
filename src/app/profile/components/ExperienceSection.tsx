import React, { useState } from 'react'
import { client } from '@/app/lib/apollo'
import { TimelineCard, StickySubtitle, Modal, AddButton } from '@/app/components'
import { CREATE_EXPERIENCE, UPDATE_EXPERIENCE, USER_EXPERIENCES } from '@/graphql'
import type { Experience } from '@/types'
import type { DeleteTarget } from '../types'
import * as styles from '../styles.css'

interface ExperienceSectionProps {
  profileId: number
  experiences: Experience[]
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>
  onDelete: (target: DeleteTarget) => void
}

export function ExperienceSection({
  profileId,
  experiences,
  setExperiences,
  onDelete,
}: ExperienceSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  const handleSave = async (data: Record<string, unknown>) => {
    if (editingExperience) {
      await client.mutate({
        mutation: UPDATE_EXPERIENCE,
        variables: { input: { id: editingExperience.id, ...data } },
      })
    } else {
      await client.mutate({
        mutation: CREATE_EXPERIENCE,
        variables: { input: { profileId, ...data } },
      })
    }
    const expRes = await client.query<{ userExperiences: Experience[] }>({
      query: USER_EXPERIENCES,
      variables: { profileId },
      fetchPolicy: 'no-cache',
    })
    setExperiences(expRes.data?.userExperiences ?? [])
  }

  return (
    <>
      <StickySubtitle>Expériences</StickySubtitle>
      <AddButton
        label="Ajouter une expérience"
        onClick={() => {
          setEditingExperience(null)
          setModalOpen(true)
        }}
      />
      <div className={styles.timelineSection}>
        {experiences.length > 0 ? (
          experiences.map((exp, idx) => (
            <TimelineCard
              key={exp.id}
              title={exp.title || ''}
              subtitle={exp.company || ''}
              subtitleExtra={exp.status || ''}
              location={exp.location || ''}
              startDate={exp.startDate || ''}
              endDate={exp.endDate || ''}
              isCurrent={false}
              description={
                Array.isArray(exp.description)
                  ? exp.description
                  : exp.description
                    ? [exp.description]
                    : []
              }
              keywords={exp.keywords || []}
              isFirst={idx === 0}
              isLast={idx === experiences.length - 1}
              showDuration={true}
              onEdit={() => {
                setEditingExperience(exp)
                setModalOpen(true)
              }}
              onDelete={() =>
                onDelete({
                  type: 'experience',
                  id: exp.id,
                  name: exp.title || 'cette expérience',
                })
              }
            />
          ))
        ) : (
          <p className={styles.emptyMessage}>Aucune expérience ajoutée pour le moment.</p>
        )}
      </div>

      <Modal
        variant="form"
        isOpen={modalOpen}
        title={editingExperience ? "Modifier l'expérience" : 'Ajouter une expérience'}
        fields={[
          { name: 'title', label: 'Titre', placeholder: 'Ex: Développeur Full Stack' },
          { name: 'company', label: 'Entreprise', placeholder: 'Ex: Google' },
          { name: 'location', label: 'Lieu', placeholder: 'Ex: Paris, France' },
          {
            name: 'status',
            label: 'Statut',
            type: 'dropdown',
            options: [
              { label: 'CDI', value: 'CDI' },
              { label: 'CDD', value: 'CDD' },
              { label: 'Freelance', value: 'Freelance' },
              { label: 'Alternance', value: 'Alternance' },
              { label: 'Stage', value: 'Stage' },
              { label: 'Projet Personelle', value: 'Projet Personelle' },
            ],
          },
          { name: 'startDate', label: 'Début (YYYY-MM)', placeholder: '2023-01' },
          { name: 'endDate', label: 'Fin (YYYY-MM ou vide)', placeholder: '2024-06' },
          {
            name: 'description',
            label: 'Description (une ligne par point)',
            multiline: true,
            asList: true,
            placeholder: "Développement de fonctionnalités\nGestion de projets\nMentorat d'équipe",
          },
        ]}
        initialData={editingExperience || {}}
        onClose={() => {
          setModalOpen(false)
          setEditingExperience(null)
        }}
        onSave={handleSave}
      />
    </>
  )
}
