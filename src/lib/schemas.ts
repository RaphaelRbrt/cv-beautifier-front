import { z } from 'zod'

// ============================================
// Auth Schemas
// ============================================

export const LoginResponseSchema = z.object({
  login: z.object({
    token: z.string(),
  }),
})

export const RegisterResponseSchema = z.object({
  register: z.object({
    token: z.string(),
    email: z.string().email(),
    userId: z.string(),
  }),
})

export const RefreshTokenResponseSchema = z.object({
  refreshToken: z.object({
    token: z.string(),
    userId: z.string().optional(),
    email: z.string().email().optional(),
  }),
})

export const MeQuerySchema = z.object({
  me: z.string().email().nullable(),
})

// ============================================
// Profile Schemas
// ============================================

export const ProfileSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  location: z.string().optional(),
  availability: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  gender: z.string().optional(),
  tone: z.string().optional(),
  profilePhotoUrl: z.string().optional(),
})

export const GetProfileQuerySchema = z.object({
  userProfile: ProfileSchema.nullable(),
})

// ============================================
// Experience, Education, Language Schemas
// ============================================

export const ExperienceSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  keywords: z.array(z.string()).nullable().optional(),
})

export const EducationSchema = z.object({
  id: z.number(),
  degree: z.string().optional(),
  school: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  isCurrent: z.boolean().optional(),
})

export const LanguageSkillSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  level: z.string().optional(),
})

// ============================================
// Task Schemas (for async job processing)
// ============================================

export const TaskResultSchema = z
  .object({
    jobOfferId: z.number().optional(),
    analysis: z
      .object({
        company: z.string().optional(),
        jobOffer: z.string().optional(),
        jobOfferInsight: z.string().optional(),
      })
      .optional(),
  })
  .passthrough() // Allow additional unknown fields

export const TaskSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'running', 'success', 'failed']).optional(),
  statusMessage: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  result: TaskResultSchema.optional(),
  errorMessage: z.string().optional(),
})

export const TaskQuerySchema = z.object({
  task: TaskSchema,
})

// ============================================
// Form Validation Schemas (for user input)
// ============================================

export const LoginFormSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  rememberMe: z.boolean().optional(),
})

export const RegisterFormSchema = z
  .object({
    email: z.string().email('Email invalide'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .max(72, 'Le mot de passe ne peut pas dépasser 72 caractères')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
      ),
    confirmPassword: z.string(),
    username: z.string().min(3).max(50).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export const ResetPasswordFormSchema = z
  .object({
    token: z.string().min(1, 'Token manquant'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .max(72, 'Le mot de passe ne peut pas dépasser 72 caractères')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export const ProfileFormSchema = z.object({
  fullName: z.string().min(1, 'Le nom complet est requis'),
  title: z.string().optional(),
  summary: z.string().optional(),
  skills: z.string().optional(), // Will be split by comma
  gender: z.string().optional(),
  tone: z.string().optional(),
  linkedinUrl: z.string().url('URL LinkedIn invalide').optional().or(z.literal('')),
  githubUrl: z.string().url('URL GitHub invalide').optional().or(z.literal('')),
  portfolioUrl: z.string().url('URL Portfolio invalide').optional().or(z.literal('')),
  location: z.string().optional(),
  availability: z.string().optional(),
})

// ============================================
// Type inference from schemas
// ============================================

export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>
export type MeQuery = z.infer<typeof MeQuerySchema>
export type Profile = z.infer<typeof ProfileSchema>
export type GetProfileQuery = z.infer<typeof GetProfileQuerySchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Education = z.infer<typeof EducationSchema>
export type LanguageSkill = z.infer<typeof LanguageSkillSchema>
export type TaskResult = z.infer<typeof TaskResultSchema>
export type Task = z.infer<typeof TaskSchema>
export type TaskQuery = z.infer<typeof TaskQuerySchema>

// Form types
export type LoginFormData = z.infer<typeof LoginFormSchema>
export type RegisterFormData = z.infer<typeof RegisterFormSchema>
export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>
export type ProfileFormData = z.infer<typeof ProfileFormSchema>

// ============================================
// Validation helper functions
// ============================================

/**
 * Safely parse and validate data with Zod schema
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @param fallback - Fallback value if validation fails
 * @returns Validated data or fallback
 */
export function safeParse<T>(schema: z.ZodSchema<T>, data: unknown, fallback?: T): T | undefined {
  const result = schema.safeParse(data)
  if (result.success) {
    return result.data
  }
  console.error('Validation error:', result.error.issues)
  return fallback
}

/**
 * Parse and validate data with Zod schema, throw on error
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validated data
 * @throws ZodError if validation fails
 */
export function parse<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}
