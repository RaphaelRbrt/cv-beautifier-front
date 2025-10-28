export interface MessageParams {
  min?: number
  max?: number
  [key: string]: unknown
}

export type MessageEntry = string | ((params?: MessageParams) => string)
