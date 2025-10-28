import React, { useState } from 'react'
import { client } from '@/app/lib/apollo'
import { TimelineCard, StickySubtitle, Modal, AddButton } from '@/app/components'
import { CREATE_EDUCATION, UPDATE_EDUCATION, USER_EDUCATION } from '@/graphql'
import type { Education } from '@/types'
import type { DeleteTarget } from '../types'
import * as styles from '../styles.css'

interface EducationSectionProps {
  profileId: number
  education: Education[]
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>
  onDelete: (target: DeleteTarget) => void
}

export function EducationSection({
  profileId,
  education,
  setEducation,
  onDelete,
}: EducationSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)

  const handleSave = async (data: Record<string, unknown>) => {
    if (editingEducation) {
      await client.mutate({
        mutation: UPDATE_EDUCATION,
        variables: { input: { id: editingEducation.id, ...data } },
      })
    } else {
      await client.mutate({
        mutation: CREATE_EDUCATION,
        variables: { input: { profileId, ...data } },
      })
    }
    const eduRes = await client.query<{ userEducation: Education[] }>({
      query: USER_EDUCATION,
      variables: { profileId },
      fetchPolicy: 'no-cache',
    })
    setEducation(eduRes.data?.userEducation ?? [])
  }

  return (
    <>
      <StickySubtitle>Éducation</StickySubtitle>
      <AddButton
        label="Ajouter une formation"
        onClick={() => {
          setEditingEducation(null)
          setModalOpen(true)
        }}
      />
      <div className={styles.timelineSection}>
        {education.length > 0 ? (
          education.map((edu, idx) => (
            <TimelineCard
              key={edu.id}
              title={edu.degree || ''}
              subtitle={edu.school || ''}
              location={edu.location || ''}
              startDate={edu.startDate || ''}
              endDate={edu.endDate || ''}
              isCurrent={false}
              description={edu.description || ''}
              isFirst={idx === 0}
              isLast={idx === education.length - 1}
              showDuration={false}
              onEdit={() => {
                setEditingEducation(edu)
                setModalOpen(true)
              }}
              onDelete={() =>
                onDelete({
                  type: 'education',
                  id: edu.id,
                  name: edu.degree || 'cette formation',
                })
              }
            />
          ))
        ) : (
          <p className={styles.emptyMessage}>Aucune formation ajoutée pour le moment.</p>
        )}
      </div>

      <Modal
        variant="form"
        isOpen={modalOpen}
        title={editingEducation ? 'Modifier la formation' : 'Ajouter une formation'}
        fields={[
          { name: 'degree', label: 'Diplôme', placeholder: 'Ex: Master en Informatique' },
          { name: 'school', label: 'Établissement', placeholder: 'Ex: Université Paris-Saclay' },
          { name: 'location', label: 'Lieu', placeholder: 'Ex: Paris, France' },
          { name: 'startDate', label: 'Début (YYYY-MM)', placeholder: '2020-09' },
          { name: 'endDate', label: 'Fin (YYYY-MM)', placeholder: '2022-06' },
          {
            name: 'description',
            label: 'Description',
            multiline: true,
            placeholder: 'Description de la formation...',
          },
        ]}
        initialData={editingEducation || {}}
        onClose={() => {
          setModalOpen(false)
          setEditingEducation(null)
        }}
        onSave={handleSave}
      />
    </>
  )
}
