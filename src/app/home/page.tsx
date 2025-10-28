'use client'
import React, { useEffect, useState, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  ME,
  GET_PROFILE,
  LOGOUT,
  ANALYZE_OFFER_TEXT_ASYNC,
  GENERATE_DOCS_ASYNC,
  TASK_BY_ID,
} from '@/graphql'
import {
  client,
  queryWithValidation,
  MeQuerySchema,
  GetProfileQuerySchema,
  TaskQuerySchema,
} from '@/lib'
import { useAppDispatch, useAppSelector, clearToken } from '@/app/store'
import { SubmitButton, Steps, type StepConfig, type StepProps } from '@/app/components'
import { getUserIdFromToken } from '@/app/lib/jwt'

const TASK_POLL_INTERVAL = 2000

interface ResultContext {
  offerId?: number
  result?: {
    jobOfferInsights?: unknown
    jobOffer?: {
      company?: string
      position?: string
      location?: string
    }
    cvUrl?: string
    coverLetterUrl?: string
    interviewPrep?: Array<{ question: string; answer: string }>
  }
}

export default function HomePage(): React.JSX.Element {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isPending, startTransition] = useTransition()
  const token = useAppSelector((s) => s.auth.token)

  const [isReady, setIsReady] = useState(false)
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    let isMounted = true

    const initializePage = async (): Promise<void> => {
      try {
        const meData = await queryWithValidation(MeQuerySchema, ME, undefined, {
          fetchPolicy: 'network-only',
        })

        if (!meData.me) {
          startTransition(() => {
            router.push('/login')
          })
          return
        }

        if (!token) {
          startTransition(() => {
            router.push('/login')
          })
          return
        }

        const userId = getUserIdFromToken(token)
        if (!userId) {
          startTransition(() => {
            router.push('/login')
          })
          return
        }

        const profileData = await queryWithValidation(
          GetProfileQuerySchema,
          GET_PROFILE,
          { userId },
          { fetchPolicy: 'cache-first' }
        )

        const profile = profileData.userProfile
        const isIncomplete = !profile || !profile.fullName || !profile.title

        if (isIncomplete) {
          startTransition(() => {
            router.push('/profile')
          })
          return
        }

        if (isMounted) {
          setFullName(profile?.fullName || '')
          setIsReady(true)
        }
      } catch {
        if (isMounted) {
          startTransition(() => {
            router.push('/login')
          })
        }
      }
    }

    void initializePage()

    return () => {
      isMounted = false
    }
  }, [dispatch, router, token])

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await client.mutate({ mutation: LOGOUT })
    } finally {
      dispatch(clearToken())
      startTransition(() => {
        router.push('/login')
      })
    }
  }, [dispatch, router])

  if (!isReady || isPending) {
    return (
      <main
        style={{
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              border: '3px solid #ddd',
              borderTopColor: '#111',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 12px',
            }}
          />
          <div>Chargement...</div>
          <style>{`@keyframes spin { from {transform: rotate(0)} to {transform: rotate(360deg)} }`}</style>
        </div>
      </main>
    )
  }

  return (
    <main style={{ padding: 16 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ margin: 0 }}>CV Beautifier</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SubmitButton type="button" onClick={() => void handleLogout()}>
            Se déconnecter
          </SubmitButton>
        </div>
      </div>
      <h2 style={{ marginTop: 12 }}>Bienvenue{fullName ? `, ${fullName}` : ''}</h2>
      <div style={{ marginTop: 16 }}>
        <Steps steps={stepsConfig} />
      </div>
    </main>
  )
}

interface LoadingSpinnerProps {
  message?: string
  progress?: number
  statusMessage?: string
}

function LoadingSpinner({
  message = 'Chargement...',
  progress,
  statusMessage,
}: LoadingSpinnerProps): React.JSX.Element {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: 300, padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 400, width: '100%' }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            border: '4px solid #e5e7eb',
            borderTopColor: '#111',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
          }}
        />
        <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>{message}</h3>
        {statusMessage && (
          <p style={{ margin: '0 0 16px', color: '#666', fontSize: 14 }}>{statusMessage}</p>
        )}
        {progress !== undefined && (
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                width: '100%',
                height: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#111',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <p style={{ marginTop: 8, fontSize: 12, color: '#888' }}>{progress}%</p>
          </div>
        )}
        <style>{`@keyframes spin { from {transform: rotate(0)} to {transform: rotate(360deg)} }`}</style>
      </div>
    </div>
  )
}

function StepAnalyzeOffer({ isActive, onNext }: StepProps): React.JSX.Element | null {
  const token = useAppSelector((s) => s.auth.token)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!text.trim()) return

    setLoading(true)
    setError(null)
    setProgress(0)
    setStatusMessage("Démarrage de l'analyse...")

    try {
      if (!token) {
        throw new Error('Token non disponible')
      }

      const userId = getUserIdFromToken(token)
      if (!userId) {
        throw new Error('User ID invalide')
      }

      setStatusMessage("Envoi de l'offre au serveur...")
      const analyzeResponse = await client.mutate<{ analyzeOfferFromTextAsync: string }>({
        mutation: ANALYZE_OFFER_TEXT_ASYNC,
        variables: { userId, text },
      })

      const analyzeTaskId = analyzeResponse.data?.analyzeOfferFromTextAsync
      if (!analyzeTaskId) {
        throw new Error('Task ID non reçu')
      }

      setProgress(10)
      setStatusMessage("Analyse de l'offre d'emploi...")

      let pollCount = 0
      const maxPolls = 120
      let offerId: number | null = null

      while (pollCount < maxPolls && !offerId) {
        await new Promise((resolve) => setTimeout(resolve, TASK_POLL_INTERVAL))

        const data = await queryWithValidation(
          TaskQuerySchema,
          TASK_BY_ID,
          { id: analyzeTaskId },
          { fetchPolicy: 'no-cache' }
        )

        const task = data.task
        if (!task) {
          pollCount++
          continue
        }

        if (task.progress !== undefined) {
          setProgress(Math.min(task.progress * 0.5, 45))
        }

        if (task.statusMessage) {
          setStatusMessage(task.statusMessage)
        }

        if (task.status === 'success') {
          offerId = task.result?.jobOfferId ?? null
          if (!offerId) {
            throw new Error('Offer ID non reçu')
          }
          setProgress(50)
          setStatusMessage('Analyse terminée ! Génération des documents...')
          break
        }

        if (task.status === 'failed') {
          throw new Error(task.errorMessage || 'Analyse échouée')
        }

        pollCount++
      }

      if (!offerId) {
        throw new Error('Timeout: analyse trop longue')
      }

      const generateResponse = await client.mutate<{
        generateDocumentsAndApplicationAsync: string
      }>({
        mutation: GENERATE_DOCS_ASYNC,
        variables: { userId, offerId },
      })

      const generateTaskId = generateResponse.data?.generateDocumentsAndApplicationAsync
      if (!generateTaskId) {
        throw new Error('Generation task ID non reçu')
      }

      setProgress(55)
      setStatusMessage('Génération du CV optimisé...')

      pollCount = 0
      while (pollCount < maxPolls) {
        await new Promise((resolve) => setTimeout(resolve, TASK_POLL_INTERVAL))

        const data = await queryWithValidation(
          TaskQuerySchema,
          TASK_BY_ID,
          { id: generateTaskId },
          { fetchPolicy: 'no-cache' }
        )

        const task = data.task
        if (!task) {
          pollCount++
          continue
        }

        if (task.progress !== undefined) {
          setProgress(50 + task.progress * 0.5)
        }

        if (task.statusMessage) {
          setStatusMessage(task.statusMessage)
        }

        if (task.status === 'success') {
          setProgress(100)
          setStatusMessage('Génération terminée !')
          if (onNext) {
            onNext({
              offerId,
              analyzeTaskId,
              generateTaskId,
              result: task.result,
            })
          }
          setLoading(false)
          return
        }

        if (task.status === 'failed') {
          throw new Error(task.errorMessage || 'Génération échouée')
        }

        pollCount++
      }

      throw new Error('Timeout: génération trop longue')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMessage)
      setLoading(false)
      setProgress(0)
    }
  }, [text, token, onNext])

  if (!isActive) return null

  if (loading) {
    return (
      <LoadingSpinner
        message="Analyse et génération en cours"
        progress={progress}
        statusMessage={statusMessage}
      />
    )
  }

  return (
    <div>
      <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
        Texte de l&apos;offre d&apos;emploi
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: 12,
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          fontSize: 14,
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
        placeholder="Collez ici le texte de l'offre d'emploi..."
      />
      {error && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          <strong>Erreur:</strong> {error}
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <SubmitButton type="button" disabled={!text.trim()} onClick={() => void handleSubmit()}>
          Analyser l&apos;offre
        </SubmitButton>
      </div>
    </div>
  )
}

type TabId = 'analyze' | 'offer' | 'cv' | 'coverLetter' | 'interview'

function StepResults({ isActive, context, onReset }: StepProps): React.JSX.Element | null {
  const [activeTab, setActiveTab] = useState<TabId>('analyze')

  if (!isActive) return null

  const typedContext = context as ResultContext | undefined
  const result = typedContext?.result
  const offerId = typedContext?.offerId

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'analyze', label: 'Analyse', icon: '📊' },
    { id: 'offer', label: "Offre d'emploi", icon: '💼' },
    { id: 'cv', label: 'CV Optimisé', icon: '📄' },
    { id: 'coverLetter', label: 'Lettre de Motivation', icon: '✉️' },
    { id: 'interview', label: 'Préparation Entretien', icon: '🎯' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: activeTab === tab.id ? '#111' : '#fff',
              color: activeTab === tab.id ? '#fff' : '#111',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div
        style={{
          padding: 24,
          backgroundColor: '#f9fafb',
          borderRadius: 8,
          minHeight: 300,
        }}
      >
        {activeTab === 'analyze' && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>Analyse de l&apos;offre</h3>
            {result?.jobOfferInsights ? (
              <div style={{ lineHeight: 1.6 }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                  {JSON.stringify(result.jobOfferInsights, null, 2)}
                </pre>
              </div>
            ) : (
              <p>Aucune donnée d&apos;analyse disponible</p>
            )}
          </div>
        )}

        {activeTab === 'offer' && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>Informations sur l&apos;offre</h3>
            {result?.jobOffer ? (
              <div style={{ lineHeight: 1.8 }}>
                <p>
                  <strong>Entreprise:</strong> {result.jobOffer.company || 'N/A'}
                </p>
                <p>
                  <strong>Poste:</strong> {result.jobOffer.position || 'N/A'}
                </p>
                <p>
                  <strong>Localisation:</strong> {result.jobOffer.location || 'N/A'}
                </p>
                <p>
                  <strong>Offre ID:</strong> {offerId}
                </p>
              </div>
            ) : (
              <p>Aucune information sur l&apos;offre disponible</p>
            )}
          </div>
        )}

        {activeTab === 'cv' && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>CV Optimisé</h3>
            {result?.cvUrl ? (
              <div>
                <div
                  style={{
                    marginBottom: 16,
                    padding: 16,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
                    Votre CV a été optimisé pour cette offre
                  </p>
                </div>
                <a
                  href={result.cvUrl}
                  download
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#111',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: 8,
                    fontWeight: 500,
                  }}
                >
                  📥 Télécharger le CV
                </a>
              </div>
            ) : (
              <p>CV en cours de génération ou non disponible</p>
            )}
          </div>
        )}

        {activeTab === 'coverLetter' && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>Lettre de Motivation</h3>
            {result?.coverLetterUrl ? (
              <div>
                <div
                  style={{
                    marginBottom: 16,
                    padding: 16,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
                    Lettre de motivation personnalisée pour cette offre
                  </p>
                </div>
                <a
                  href={result.coverLetterUrl}
                  download
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#111',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: 8,
                    fontWeight: 500,
                  }}
                >
                  📥 Télécharger la Lettre
                </a>
              </div>
            ) : (
              <p>Lettre de motivation en cours de génération ou non disponible</p>
            )}
          </div>
        )}

        {activeTab === 'interview' && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: 20 }}>Préparation à l&apos;Entretien</h3>
            {result?.interviewPrep ? (
              <div style={{ lineHeight: 1.8 }}>
                <h4 style={{ fontSize: 16, marginTop: 0 }}>Questions Fréquentes</h4>
                {result.interviewPrep.map((q, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: 16,
                      padding: 16,
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    <p style={{ fontWeight: 500, margin: '0 0 8px' }}>Q: {q.question}</p>
                    <p style={{ margin: 0, color: '#666' }}>R: {q.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Préparation entretien non disponible</p>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <button
          type="button"
          onClick={onReset}
          style={{
            padding: '12px 32px',
            fontSize: 16,
            fontWeight: 500,
            backgroundColor: '#fff',
            border: '2px solid #111',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#111'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff'
            e.currentTarget.style.color = '#111'
          }}
        >
          🔄 Analyser une nouvelle offre
        </button>
      </div>
    </div>
  )
}

const stepsConfig: StepConfig[] = [
  {
    id: 'step1',
    title: 'Insérer une offre',
    render: (props) => <StepAnalyzeOffer {...props} />,
  },
  {
    id: 'step2',
    title: 'Résultats',
    render: (props) => <StepResults {...props} />,
  },
]
