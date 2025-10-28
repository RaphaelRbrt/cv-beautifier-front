import { client } from '@/lib'
import { ANALYZE_OFFER_TEXT_ASYNC, GENERATE_DOCS_ASYNC } from '@/graphql'

export const offerService = {
  async analyzeOffer(userId: number, text: string): Promise<string> {
    const response = await client.mutate<{ analyzeOfferFromTextAsync: string }>({
      mutation: ANALYZE_OFFER_TEXT_ASYNC,
      variables: { userId, text },
    })

    const taskId = response.data?.analyzeOfferFromTextAsync
    if (!taskId) {
      throw new Error('No task ID returned from analysis')
    }

    return taskId
  },

  async generateDocuments(userId: number, offerId: number): Promise<string> {
    const response = await client.mutate<{ generateDocumentsAndApplicationAsync: string }>({
      mutation: GENERATE_DOCS_ASYNC,
      variables: { userId, offerId },
    })

    const taskId = response.data?.generateDocumentsAndApplicationAsync
    if (!taskId) {
      throw new Error('No task ID returned from document generation')
    }

    return taskId
  },
}
