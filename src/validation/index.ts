export const trimWhitespace = (value: string) => value.trim()
export const toLowerCase = (value: string) => value.toLowerCase()

export const isRequired = (value: string) => trimWhitespace(value).length > 0

export const isEmail = (value: string) =>
  /^[\w.!#$%&'*+/=?`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/.test(value.toLowerCase())

export const hasMinLength = (value: string, min: number) => trimWhitespace(value).length >= min
export const hasMaxLength = (value: string, max: number) => trimWhitespace(value).length <= max

export const usernameValid = (value: string) => /^[A-Za-z0-9_]{3,50}$/.test(value)

export const passwordMinLength = (value: string, min = 8) => value.length >= min
export const passwordComplex = (value: string) =>
  /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)

export const equalsTo = (a: string, b: string) => a === b

export const sanitizeBasic = (value: string) => value.replace(/[<>;'"\\]/g, '')

export type AsyncValidators = {
  emailExists?: (email: string) => Promise<boolean>
  accountExists?: (email: string) => Promise<boolean>
  passwordMatches?: (email: string, password: string) => Promise<boolean>
}
