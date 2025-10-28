import type { MessageEntry, MessageParams } from './types'

export const ERRORS: Record<string, MessageEntry> = {
  // Auth / Login
  LOGIN_FAILED: 'Identifiants invalides',
  LOGIN_PASSWORD_TOO_LONG: 'Le mot de passe ne doit pas dépasser 72 caractères',

  // Home
  HOME_LOAD_FAILED: "Erreur de chargement de la page d'accueil",

  // Profile
  PROFILE_LOAD_FAILED: 'Erreur lors du chargement du profil',
  PROFILE_SAVE_FAILED: 'Erreur lors de la sauvegarde du profil',

  // Register (mutations)
  REGISTER_FAILED: 'Erreur inscription',
  REGISTER_PASSWORD_TOO_LONG: 'Le mot de passe ne doit pas dépasser 72 caractères',

  // Reset Password
  RESET_PASSWORD_FAILED: 'Erreur réinitialisation du mot de passe',
  RESET_PASSWORD_PASSWORD_TOO_LONG: 'Le mot de passe ne doit pas dépasser 72 caractères',
  RESET_PASSWORD_MIN: (p?: MessageParams) => `Min ${p?.min ?? 8} caractères`,
  RESET_PASSWORD_COMPLEXITY: 'Doit contenir majuscule, minuscule, chiffre, spécial',

  // Forgot password
  REQUEST_PASSWORD_RESET_FAILED: 'Erreur lors de la demande de réinitialisation',
  REQUEST_PASSWORD_RESET_EMAIL_REQUIRED: 'Email requis',
  REQUEST_PASSWORD_RESET_EMAIL_INVALID: 'Format email invalide',

  // Register (validations champs)
  EMAIL_REQUIRED: 'Email requis',
  EMAIL_INVALID: 'Format email invalide',
  PASSWORD_REQUIRED: 'Mot de passe requis',
  PASSWORD_MIN: (p?: MessageParams) => `Min ${p?.min ?? 8} caractères`,
  PASSWORD_COMPLEXITY: 'Doit contenir majuscule, minuscule, chiffre, spécial',
  PASSWORD_MISMATCH: 'Les mots de passe ne correspondent pas',
  USERNAME_LENGTH_RANGE: (p?: MessageParams) =>
    `Nom d'utilisateur: ${p?.min ?? 3}-${p?.max ?? 50} caractères`,
}

export type ErrorCode = keyof typeof ERRORS

export function getErrorMessage(code: ErrorCode, params?: MessageParams): string {
  const entry = ERRORS[code]
  return typeof entry === 'function' ? entry(params) : entry
}
