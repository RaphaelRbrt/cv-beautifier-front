export interface LoadingState {
  isLoading: boolean
  message: string
  progress: number
  error?: string
}

export interface LoadingOverlayProps {
  isLoading: boolean
  message: string
  progress: number
  error?: string
}

export interface InitialLoaderProps {
  message?: string
}

export interface StepContext {
  applicationId?: string
  documentId?: string
}

export interface StepAnalyzeOfferProps {
  isActive: boolean
  onNext: (context: StepContext) => void
  onLoadingChange: (state: LoadingState) => void
}

export interface StepResultsProps {
  isActive: boolean
  context?: StepContext
}

export type TabType = 'summary' | 'docs' | 'insights'

export interface UsePageInitializationReturn {
  isReady: boolean
  fullName: string
  isPending: boolean
}

export interface UseOfferAnalysisParams {
  text: string
  userId: number
  onLoadingChange: (state: LoadingState) => void
  onNext: (context: StepContext) => void
}

export interface TaskResult {
  jobOfferId?: string
  applicationId?: string
  documentId?: string
}

export interface Task {
  status: 'pending' | 'running' | 'success' | 'failed'
  statusMessage?: string
  progress?: number
  errorMessage?: string
  result?: TaskResult
}

export interface TaskQueryResponse {
  task: Task
}

export interface AnalyzeOfferResponse {
  analyzeOfferFromTextAsync: string
}

export interface GenerateDocsResponse {
  generateDocumentsAndApplicationAsync: string
}
