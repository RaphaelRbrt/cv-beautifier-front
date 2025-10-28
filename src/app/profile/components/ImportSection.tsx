import React, { useState } from 'react'
import { CTAButton } from '@/app/components'
import { downloadExampleJson } from '../utils'
import * as styles from '../styles.css'

interface ImportSectionProps {
  onImport: (jsonString: string) => Promise<void>
  disabled?: boolean
}

export function ImportSection({ onImport, disabled = false }: ImportSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [importJson, setImportJson] = useState('')

  const handleImport = async () => {
    await onImport(importJson)
    setImportJson('')
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Profil</h1>
        <div className={styles.buttonGroup}>
          <button onClick={downloadExampleJson} className={styles.utilButton}>
            Télécharger JSON d'exemple
          </button>
          <button onClick={() => setIsOpen((v) => !v)} className={styles.utilButton}>
            {isOpen ? 'Fermer import' : 'Importer JSON'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.importBox}>
          <label className={styles.label}>Coller le JSON d'import</label>
          <textarea
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            rows={10}
            className={styles.importTextarea}
            placeholder='{"profile": {"fullName": "..."}, "experiences": [], "education": [], "languages": []}'
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <CTAButton
              onClick={() => {
                void handleImport()
              }}
              disabled={disabled}
            >
              Importer
            </CTAButton>
          </div>
        </div>
      )}
    </>
  )
}
