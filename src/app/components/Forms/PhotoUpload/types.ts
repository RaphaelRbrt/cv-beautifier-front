export interface PhotoUploadProps {
  photoPreview: string
  onPhotoChange: (file: File | null) => void
  disabled?: boolean
}

export interface ValidationRules {
  validTypes: string[]
  maxSize: number
}

export const PHOTO_VALIDATION: ValidationRules = {
  validTypes: ['image/jpeg', 'image/png', 'image/gif'],
  maxSize: 5 * 1024 * 1024, // 5MB
}
