/**
 * Convertit une valeur unknown en string de manière sûre
 * Gère les cas: string, number, boolean, array, null, undefined
 */
export function valueToString(value: unknown): string {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join('\n')
  }

  // Pour les objets, tenter de sérialiser en JSON ou retourner vide
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return ''
    }
  }

  return ''
}
