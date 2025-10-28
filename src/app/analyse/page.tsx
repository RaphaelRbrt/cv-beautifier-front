'use client'
import { useState, useCallback, useMemo } from 'react'
import { Steps } from '@/app/components'
import type { StepConfig } from '@/app/components'
import { usePageInitialization } from './hooks/usePageInitialization'
import { LoadingOverlay, InitialLoader, StepAnalyzeOffer, StepResults } from './components'
import { STEP_TITLES } from './constants'
import type { LoadingState } from './types'
import * as styles from './styles.css'

export default function AnalysePage() {
  const { isReady, fullName, isPending } = usePageInitialization()

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    message: '',
    progress: 0,
    error: undefined,
  })

  const handleLoadingChange = useCallback((state: LoadingState) => {
    setLoadingState(state)
  }, [])

  const stepsConfig = useMemo(
    (): StepConfig[] => [
      {
        id: 'step1',
        title: STEP_TITLES.STEP1,
        render: (props) => <StepAnalyzeOffer {...props} onLoadingChange={handleLoadingChange} />,
      },
      {
        id: 'step2',
        title: STEP_TITLES.STEP2,
        render: (props) => <StepResults {...props} />,
      },
    ],
    [handleLoadingChange]
  )

  if (!isReady || isPending) {
    return <InitialLoader />
  }

  return (
    <main style={styles.mainContainer}>
      <h1 style={styles.heading}>Bienvenue{fullName ? `, ${fullName}` : ''}</h1>
      <div style={styles.stepsContainer}>
        <Steps steps={stepsConfig} />
      </div>
      <LoadingOverlay
        isLoading={loadingState.isLoading}
        message={loadingState.message}
        progress={loadingState.progress}
        error={loadingState.error}
      />
    </main>
  )
}
