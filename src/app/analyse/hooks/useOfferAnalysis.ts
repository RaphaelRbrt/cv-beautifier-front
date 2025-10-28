import { useCallback } from 'react'
import { client } from '@/lib'
import { ANALYZE_OFFER_TEXT_ASYNC, GENERATE_DOCS_ASYNC, TASK_BY_ID } from '@/graphql'
import { DEFAULT_USER_ID, TASK_POLL_INTERVAL, LOADING_MESSAGES } from '../constants'
import type {
  UseOfferAnalysisParams,
  TaskQueryResponse,
  AnalyzeOfferResponse,
  GenerateDocsResponse,
} from '../types'

export const useOfferAnalysis = ({
  text,
  userId,
  onLoadingChange,
  onNext,
}: UseOfferAnalysisParams) => {
  const handleAnalyze = useCallback(async () => {
    if (!text.trim()) return

    const effectiveUserId = userId || DEFAULT_USER_ID

    onLoadingChange({
      isLoading: true,
      message: LOADING_MESSAGES.INITIALIZATION,
      progress: 0,
      error: undefined,
    })

    try {
      const response = await client.mutate<AnalyzeOfferResponse>({
        mutation: ANALYZE_OFFER_TEXT_ASYNC,
        variables: { userId: effectiveUserId, text },
      })

      const taskId = response.data?.analyzeOfferFromTextAsync
      if (!taskId) throw new Error('No task ID')

      let currentTaskId = taskId
      let isGenerationPhase = false

      while (true) {
        await new Promise((resolve) => setTimeout(resolve, TASK_POLL_INTERVAL))

        const taskResponse = await client.query<TaskQueryResponse>({
          query: TASK_BY_ID,
          variables: { id: currentTaskId },
          fetchPolicy: 'no-cache',
        })

        const task = taskResponse.data?.task
        if (!task) continue

        onLoadingChange({
          isLoading: true,
          message: task.statusMessage || LOADING_MESSAGES.INITIALIZATION,
          progress: task.progress ?? 0,
          error: undefined,
        })

        if (task.status === 'success') {
          if (!isGenerationPhase) {
            const offerId = task.result?.jobOfferId
            if (!offerId) throw new Error('No offer ID')

            onLoadingChange({
              isLoading: true,
              message: LOADING_MESSAGES.GENERATION_START,
              progress: task.progress ?? 0,
              error: undefined,
            })

            const genResponse = await client.mutate<GenerateDocsResponse>({
              mutation: GENERATE_DOCS_ASYNC,
              variables: { userId: effectiveUserId, offerId },
            })

            currentTaskId = genResponse.data?.generateDocumentsAndApplicationAsync || ''
            isGenerationPhase = true
          } else {
            onLoadingChange({
              isLoading: false,
              message: '',
              progress: 100,
              error: undefined,
            })
            onNext({
              applicationId: task.result?.applicationId,
              documentId: task.result?.documentId,
            })
            break
          }
        }

        if (task.status === 'failed') {
          onLoadingChange({
            isLoading: true,
            message: task.statusMessage || '',
            progress: task.progress ?? 0,
            error: task.errorMessage || 'Échec',
          })
          break
        }
      }
    } catch (error) {
      console.error('Error:', error)
      onLoadingChange({
        isLoading: true,
        message: '',
        progress: 0,
        error: error instanceof Error ? error.message : 'Erreur',
      })
    }
  }, [text, userId, onLoadingChange, onNext])

  return { handleAnalyze }
}
