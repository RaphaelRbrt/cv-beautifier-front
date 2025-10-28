// API Client exports
export { queryWithValidation, mutateWithValidation, validateForm } from './api-client'

// Apollo Client export
export { client } from '@/app/lib/apollo'

// Schema exports
export {
  // Auth schemas
  LoginResponseSchema,
  RegisterResponseSchema,
  RefreshTokenResponseSchema,
  MeQuerySchema,

  // Profile schemas
  ProfileSchema,
  GetProfileQuerySchema,

  // Experience, Education, Language schemas
  ExperienceSchema,
  EducationSchema,
  LanguageSkillSchema,

  // Task schemas
  TaskResultSchema,
  TaskSchema,
  TaskQuerySchema,

  // Form validation schemas
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordFormSchema,
  ProfileFormSchema,

  // Validation helpers
  safeParse,
  parse,
} from './schemas'

// Type exports (inferred from Zod schemas)
export type {
  LoginResponse,
  RegisterResponse,
  RefreshTokenResponse,
  MeQuery,
  Profile,
  GetProfileQuery,
  Experience,
  Education,
  LanguageSkill,
  TaskResult,
  Task,
  TaskQuery,
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
  ProfileFormData,
} from './schemas'
