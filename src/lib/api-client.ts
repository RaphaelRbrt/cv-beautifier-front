import { z } from 'zod'
import { client } from '@/app/lib/apollo'
import type { DocumentNode } from '@apollo/client'

export async function queryWithValidation<TData, TVariables = Record<string, unknown>>(
  schema: z.ZodSchema<TData>,
  query: DocumentNode,
  variables?: TVariables,
  options?: {
    fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache'
    context?: Record<string, unknown>
  }
): Promise<TData> {
  const result = await client.query({
    query,
    variables: variables as Record<string, unknown>,
    fetchPolicy: options?.fetchPolicy || 'no-cache',
    context: options?.context,
  })

  const parseResult = schema.safeParse(result.data)

  if (!parseResult.success) {
    console.error('GraphQL response validation failed:', {
      query: query.loc?.source.body,
      variables,
      errors: parseResult.error.issues,
      receivedData: result.data,
    })
    throw new Error(`Response validation failed: ${parseResult.error.issues[0]?.message}`)
  }

  return parseResult.data
}

export async function mutateWithValidation<TData, TVariables = Record<string, unknown>>(
  schema: z.ZodSchema<TData>,
  mutation: DocumentNode,
  variables?: TVariables,
  options?: {
    context?: Record<string, unknown>
  }
): Promise<TData> {
  const result = await client.mutate({
    mutation,
    variables: variables as Record<string, unknown>,
    context: options?.context,
  })

  const parseResult = schema.safeParse(result.data)

  if (!parseResult.success) {
    console.error('GraphQL response validation failed:', {
      mutation: mutation.loc?.source.body,
      variables,
      errors: parseResult.error.issues,
      receivedData: result.data,
    })
    throw new Error(`Response validation failed: ${parseResult.error.issues[0]?.message}`)
  }

  return parseResult.data
}

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: Record<string, string> = {}
  result.error.issues.forEach((err) => {
    const path = err.path.join('.')
    if (path) {
      errors[path] = err.message
    }
  })

  return { success: false, errors }
}
