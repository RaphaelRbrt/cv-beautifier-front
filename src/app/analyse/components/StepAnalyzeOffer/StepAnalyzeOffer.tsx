import { memo, useState } from 'react'
import { useAppSelector } from '@/app/store'
import { SubmitButton } from '@/app/components'
import { useOfferAnalysis } from '../../hooks/useOfferAnalysis'
import { DEFAULT_USER_ID } from '../../constants'
import type { StepAnalyzeOfferProps } from '../../types'
import * as styles from './styles.css'

export const StepAnalyzeOffer = memo<StepAnalyzeOfferProps>(
  ({ isActive, onNext, onLoadingChange }) => {
    const auth = useAppSelector((s) => s.auth)
    const [text, setText] = useState('')

    const userId = auth.userId ? parseInt(auth.userId, 10) : DEFAULT_USER_ID

    const { handleAnalyze } = useOfferAnalysis({
      text,
      userId,
      onLoadingChange,
      onNext,
    })

    if (!isActive) return null

    return (
      <div>
        <label style={styles.label}>Texte de l'offre d'emploi</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          style={styles.textarea}
          placeholder="Collez le texte complet de l'offre d'emploi ici..."
        />
        <div style={styles.buttonContainer}>
          <SubmitButton type="button" disabled={!text.trim()} onClick={handleAnalyze}>
            Analyser et générer les documents
          </SubmitButton>
        </div>
      </div>
    )
  }
)

StepAnalyzeOffer.displayName = 'StepAnalyzeOffer'
