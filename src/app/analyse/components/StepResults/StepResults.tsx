import { memo, useState, useCallback } from 'react'
import { TABS } from '../../constants'
import type { StepResultsProps, TabType } from '../../types'
import * as styles from './styles.css'

export const StepResults = memo<StepResultsProps>(({ isActive, context }) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary')

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  if (!isActive) return null

  return (
    <div>
      <h2 className={styles.heading}>Vos documents sont prêts !</h2>
      <div className={styles.tabsContainer}>
        {TABS.map(({ id, label }) => (
          <button key={id} onClick={() => handleTabChange(id)}>
            {label}
          </button>
        ))}
      </div>
      <div className={styles.contentContainer}>
        {activeTab === 'summary' && (
          <div>
            <p className={styles.paragraph}>
              Application ID: <strong>{context?.applicationId || '-'}</strong>
            </p>
            <p className={styles.paragraph}>
              Document ID: <strong>{context?.documentId || '-'}</strong>
            </p>
          </div>
        )}
        {activeTab === 'docs' && <div>Liens de téléchargement (à implémenter).</div>}
        {activeTab === 'insights' && <div>Analyse (à implémenter).</div>}
      </div>
    </div>
  )
})

StepResults.displayName = 'StepResults'
