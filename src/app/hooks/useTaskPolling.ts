import { useState, useCallback, useRef } from 'react'
import { client } from '@/lib'
import { TASK_BY_ID } from '@/graphql'
import { Task } from '@/types'

const TASK_POLL_INTERVAL = 2000

interface TaskProgress {
  message: string
  progress: number
  error?: string
}

interface UseTaskPollingReturn {
  pollTask: (taskId: string) => Promise<Task | null>
  progress: TaskProgress
  isPolling: boolean
}

export function useTaskPolling(): UseTaskPollingReturn {
  const [progress, setProgress] = useState<TaskProgress>({
    message: 'Initialisation...',
    progress: 0,
  })
  const [isPolling, setIsPolling] = useState(false)
  const isMountedRef = useRef(true)

  const pollTask = useCallback(async (taskId: string): Promise<Task | null> => {
    setIsPolling(true)
    setProgress({ message: 'Initialisation...', progress: 0 })

    try {
      while (isMountedRef.current) {
        await new Promise((resolve) => setTimeout(resolve, TASK_POLL_INTERVAL))

        const taskResponse = await client.query<{ task: Task }>({
          query: TASK_BY_ID,
          variables: { id: taskId },
          fetchPolicy: 'no-cache',
        })

        const task = taskResponse.data?.task
        if (!task) continue

        if (task.statusMessage) {
          setProgress((prev) => ({ ...prev, message: task.statusMessage! }))
        }

        if (task.progress !== undefined) {
          setProgress((prev) => ({ ...prev, progress: task.progress! }))
        }

        if (task.status === 'success') {
          setIsPolling(false)
          return task
        }

        if (task.status === 'failed') {
          setProgress((prev) => ({
            ...prev,
            error: task.errorMessage || 'Une erreur est survenue',
          }))
          setIsPolling(false)
          return null
        }
      }

      return null
    } catch (error) {
      console.error('Task polling error:', error)
      setProgress((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erreur de polling',
      }))
      setIsPolling(false)
      return null
    }
  }, [])

  return { pollTask, progress, isPolling }
}
