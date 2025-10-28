// Auth types
export type LoginResponse = {
  login: { token: string }
}

export type LoginVariables = { email: string; password: string; rememberMe?: boolean }

export type RegisterResponse = {
  register: { token: string; email: string; userId: string }
}

export type RegisterVariables = { email: string; password: string }

export type MeQuery = { me: string | null }

// GraphQL Error types
export interface GraphQLError {
  message: string
  extensions?: {
    code?: string
    [key: string]: unknown
  }
}

export interface NetworkError {
  statusCode?: number
  result?: {
    errors?: Array<{ message: string }>
  }
  bodyText?: string
  message?: string
}

export interface ApolloError {
  graphQLErrors?: GraphQLError[]
  networkError?: NetworkError
  message?: string
}

// Task types for async job processing
export interface TaskResult {
  jobOfferId?: number
  analysis?: {
    company?: string
    jobOffer?: string
    jobOfferInsight?: string
  }
  [key: string]: unknown
}

export interface Task {
  id: string
  status?: 'pending' | 'running' | 'success' | 'failed'
  statusMessage?: string
  progress?: number
  result?: TaskResult
  errorMessage?: string
}

export type GetProfileQuery = {
  userProfile: {
    id?: number
    fullName?: string
    linkedinUrl?: string
    githubUrl?: string
    portfolioUrl?: string
    location?: string
    availability?: string
    title?: string
    summary?: string
    skills?: string[]
    gender?: string
    tone?: string
    profilePhotoUrl?: string
  } | null
}

// New lists
export type Experience = {
  id: number
  title?: string
  company?: string
  location?: string
  status?: string
  startDate?: string | null
  endDate?: string | null
  description?: string | null
  keywords?: string[] | null
}

export type Education = {
  id: number
  degree?: string
  school?: string
  location?: string
  startDate?: string | null
  endDate?: string | null
  description?: string | null
}

export type LanguageSkill = {
  id: number
  name: string
  level?: string
}

// Timeline Card Props
export interface TimelineCardProps {
  logo?: string
  title: string
  subtitle: string
  subtitleExtra?: string
  location?: string
  startDate?: string
  endDate?: string
  isCurrent?: boolean
  description?: string | string[]
  keywords?: string[]
  isFirst?: boolean
  isLast?: boolean
  onEdit?: () => void
  onDelete?: () => void
  showDuration?: boolean
}

export interface ExperienceCardProps {
  logo?: string
  title: string
  company: string
  status?: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  description?: string[]
  keywords?: string[]
  isFirst?: boolean
  isLast?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export interface EducationCardProps {
  logo?: string
  degree: string
  school: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  description?: string
  isFirst?: boolean
  isLast?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export interface LanguageCardProps {
  name: string
  level: string
  isFirst?: boolean
  isLast?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export type InputTextProps = {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  name?: string
  disabled?: boolean
  autoComplete?: string
  error?: string
  maxLength?: number
}

export type SelectOption = { label: string; value: string }

export type InputDropdownProps = {
  label?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  name?: string
  disabled?: boolean
  error?: string
}

export type SubmitButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => Promise<boolean | void> | boolean | void
  type?: 'button' | 'submit' | 'reset'
}

export type FieldErrors = Record<string, string | undefined>

export type RegisterForm = {
  email: string
  password: string
  confirmPassword: string
  username?: string
}

// Reset password types
export type ResetPasswordVariables = { token: string; new: string }
export type ResetPasswordResponse = { resetPassword: boolean }

// Request password reset types
export type RequestPasswordResetVariables = { email: string }
export type RequestPasswordResetResponse = { requestPasswordReset: boolean }
