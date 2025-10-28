import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import type { GraphQLError } from 'graphql'
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs'
import { store } from '@/app/store/store'
import { setToken, clearToken, setAuth } from '@/app/store/authSlice'
import { addError } from '@/app/store/errorsSlice'
import { getErrorMessage } from '@/errors'
import { REFRESH_TOKEN } from '@/graphql'

const uploadLink = new UploadHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || '/cv-beautifier-backend/graphql',
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
})

const authLink = setContext((_, context) => {
  const skipAuth = (context as { skipAuth?: boolean }).skipAuth
  const headers = (context as { headers?: Record<string, string> }).headers || {}

  if (skipAuth) {
    return { headers }
  }

  const token = store.getState().auth.token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

interface RefreshTokenResponse {
  refreshToken: {
    token: string
    userId: string
    email: string
  }
}

const errorLink = onError((errorHandler) => {
  const { graphQLErrors, networkError, operation, forward } = errorHandler as {
    graphQLErrors?: readonly GraphQLError[]
    networkError?: Error & { statusCode?: number }
    operation: unknown
    forward: (operation: unknown) => Observable<unknown>
  }

  const isUnauthorized =
    networkError?.statusCode === 401 ||
    graphQLErrors?.some((error) => error.extensions?.code === 'UNAUTHENTICATED')

  if (!isUnauthorized) {
    return
  }

  return new Observable((observer) => {
    client
      .mutate<RefreshTokenResponse>({
        mutation: REFRESH_TOKEN,
        context: { skipAuth: true },
      })
      .then((response) => {
        const payload = response.data?.refreshToken

        if (!payload?.token) {
          throw new Error('Token refresh failed')
        }

        if (payload.userId && payload.email) {
          store.dispatch(
            setAuth({
              token: payload.token,
              userId: String(payload.userId),
              email: String(payload.email),
            })
          )
        } else {
          store.dispatch(setToken(payload.token))
        }

        const subscription = forward(operation).subscribe({
          next: (result) => observer.next(result as never),
          error: (err) => observer.error(err),
          complete: () => {
            observer.complete()
            subscription.unsubscribe()
          },
        })
      })
      .catch((error: Error) => {
        store.dispatch(clearToken())
        store.dispatch(
          addError({
            id: `${Date.now()}-unauth`,
            message: getErrorMessage('LOGIN_FAILED'),
            code: 'UNAUTHENTICATED',
          })
        )
        observer.error(error)
      })
  })
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          me: {
            merge: false,
          },
          userProfile: {
            merge: false,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})
