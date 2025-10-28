import { ApolloLink } from '@apollo/client'
export default class UploadHttpLink extends ApolloLink {
  constructor(options?: {
    uri?: string
    credentials?: 'include' | 'same-origin' | 'omit'
    headers?: Record<string, string>
  })
}
