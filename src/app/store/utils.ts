import type { ApolloErrorLike } from './types'

/**
 * Extrait un message d'erreur lisible depuis une erreur Apollo
 * @param error L'erreur Apollo ou une erreur générique
 * @param fallbackMessage Message par défaut si aucun message ne peut être extrait
 * @returns Le message d'erreur le plus pertinent
 */
export function extractErrorMessage(error: ApolloErrorLike, fallbackMessage: string): string {
  // Priorité 1: Erreurs GraphQL
  if (error.graphQLErrors?.[0]?.message) {
    return error.graphQLErrors[0].message
  }

  // Priorité 2: Erreurs réseau avec détails
  if (error.networkError?.result?.errors?.[0]?.message) {
    return error.networkError.result.errors[0].message
  }

  // Priorité 3: Body text des erreurs réseau
  if (error.networkError?.result?.bodyText) {
    return error.networkError.result.bodyText
  }

  // Priorité 4: Message de l'erreur réseau
  if (error.networkError?.message) {
    return error.networkError.message
  }

  // Priorité 5: Message général de l'erreur
  if (error.message) {
    return error.message
  }

  // Fallback
  return fallbackMessage
}

/**
 * Génère un ID unique pour les erreurs
 * @returns Un ID unique combinant timestamp et random string
 */
export function generateErrorId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}
