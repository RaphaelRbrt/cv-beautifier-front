export interface AppError {
  id: string
  message: string
  code?: string
  meta?: Record<string, unknown>
}

export interface ErrorsState {
  list: AppError[]
}

export interface NetworkError {
  result?: {
    errors?: Array<{ message: string }>
    bodyText?: string
  }
  message?: string
}

export interface GraphQLErrorExtended {
  message: string
}

export interface ApolloErrorLike {
  graphQLErrors?: GraphQLErrorExtended[]
  networkError?: NetworkError
  message?: string
}
