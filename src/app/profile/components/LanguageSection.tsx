import React, { useState } from 'react'
import { client } from '@/app/lib/apollo'
import { TimelineCard, StickySubtitle, Modal, AddButton } from '@/app/components'
import { CREATE_LANGUAGE, UPDATE_LANGUAGE, USER_LANGUAGES } from '@/graphql'
import type { LanguageSkill } from '@/types'
import type { DeleteTarget } from '../types'
import * as styles from '../styles.css'

interface LanguageSectionProps {
  profileId: number
  languages: LanguageSkill[]
  setLanguages: React.Dispatch<React.SetStateAction<LanguageSkill[]>>
  onDelete: (target: DeleteTarget) => void
}

export function LanguageSection({
  profileId,
  languages,
  setLanguages,
  onDelete,
}: LanguageSectionProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLanguage, setEditingLanguage] = useState<LanguageSkill | null>(null)

  const handleSave = async (data: Record<string, unknown>) => {
    if (editingLanguage) {
      await client.mutate({
        mutation: UPDATE_LANGUAGE,
        variables: { input: { id: editingLanguage.id, ...data } },
      })
    } else {
      await client.mutate({
        mutation: CREATE_LANGUAGE,
        variables: { input: { profileId, ...data } },
      })
    }
    const langRes = await client.query<{ userLanguages: LanguageSkill[] }>({
      query: USER_LANGUAGES,
      variables: { profileId },
      fetchPolicy: 'no-cache',
    })
    setLanguages(langRes.data?.userLanguages ?? [])
  }

  return (
    <>
      <StickySubtitle>Langues</StickySubtitle>
      <AddButton
        label="Ajouter une langue"
        onClick={() => {
          setEditingLanguage(null)
          setModalOpen(true)
        }}
      />
      <div className={styles.timelineSection}>
        {languages.length > 0 ? (
          languages.map((lang, idx) => (
            <TimelineCard
              key={lang.id}
              title={lang.name || ''}
              subtitle={lang.level || ''}
              isFirst={idx === 0}
              isLast={idx === languages.length - 1}
              showDuration={false}
              onEdit={() => {
                setEditingLanguage(lang)
                setModalOpen(true)
              }}
              onDelete={() =>
                onDelete({
                  type: 'language',
                  id: lang.id,
                  name: lang.name || 'cette langue',
                })
              }
            />
          ))
        ) : (
          <p className={styles.emptyMessage}>Aucune langue ajoutée pour le moment.</p>
        )}
      </div>

      <Modal
        variant="form"
        isOpen={modalOpen}
        title={editingLanguage ? 'Modifier la langue' : 'Ajouter une langue'}
        fields={[
          { name: 'name', label: 'Langue', placeholder: 'Ex: Anglais' },
          { name: 'level', label: 'Niveau', placeholder: 'Ex: Courant, Natif, B2, etc.' },
        ]}
        initialData={editingLanguage || {}}
        onClose={() => {
          setModalOpen(false)
          setEditingLanguage(null)
        }}
        onSave={handleSave}
      />
    </>
  )
}
