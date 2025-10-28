import type { ApolloErrorLike } from '@/app/store'
import { extractErrorMessage } from '@/app/store'

/**
 * Utilitaire pour extraire un message d'erreur depuis une erreur Apollo ou Error standard
 */
export function handleApolloError(error: unknown, fallbackMessage: string): string {
  if (error instanceof Error) {
    return extractErrorMessage(error as ApolloErrorLike, fallbackMessage)
  }
  return fallbackMessage
}
