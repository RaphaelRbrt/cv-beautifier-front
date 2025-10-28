export const DEFAULT_USER_ID = 1

export const TASK_POLL_INTERVAL = 2000

export const LOADING_MESSAGES = {
  INITIALIZATION: 'Initialisation...',
  GENERATION_START: 'Démarrage de la génération...',
  LOADING: 'Chargement...',
} as const

export const TABS = [
  { id: 'summary' as const, label: 'Résumé' },
  { id: 'docs' as const, label: 'Documents' },
  { id: 'insights' as const, label: 'Insights' },
] as const

export const STEP_TITLES = {
  STEP1: "Insérer le contenu de l'offre",
  STEP2: 'Résultats',
} as const
