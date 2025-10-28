import type { Experience, Education, LanguageSkill } from '@/types'

// Types pour les données du profil
export interface ProfileData {
  email: string
  fullName: string
  title: string
  summary: string
  skills: string
  gender: string
  tone: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
  location: string
  availability: string
  photoPreview: string
}

export interface ProfileFormData {
  fullName: string
  title: string
  summary: string
  skills: string
  gender: string
  tone: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
  location: string
  availability: string
}

// Types pour l'import/export
export interface ProfileImportProfile extends Omit<Partial<ProfileFormData>, 'skills'> {
  skills?: string[]
}

export interface ProfileImportData {
  profile?: ProfileImportProfile
  experiences?: Partial<Experience>[]
  education?: Partial<Education>[]
  languages?: Partial<LanguageSkill>[]
}

// Types pour les modals
export interface DeleteTarget {
  type: 'experience' | 'education' | 'language'
  id: number
  name: string
}

// Types de retour des hooks
export interface UseProfileDataReturn {
  profileId: number | null
  profileData: ProfileData
  experiences: Experience[]
  education: Education[]
  languages: LanguageSkill[]
  loading: boolean
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>
  setLanguages: React.Dispatch<React.SetStateAction<LanguageSkill[]>>
  setPhotoPreview: (url: string) => void
  setProfileId: (id: number | null) => void
  refreshProfile: () => Promise<void>
}

export interface UseProfilePhotoReturn {
  photo: File | null
  handlePhotoChange: (file: File | null) => void
  uploadPhoto: (userId: number, photoPreview: string) => Promise<string>
}

export interface UseProfileMutationsReturn {
  loading: boolean
  success: boolean
  saveProfile: (
    userId: number,
    formData: ProfileFormData,
    uploadPhotoFn: (userId: number, photoPreview: string) => Promise<string>,
    photoPreview: string
  ) => Promise<void>
  importProfile: (
    userId: number,
    importJson: string,
    refreshFn: () => Promise<void>
  ) => Promise<void>
  deleteItem: (
    deleteTarget: DeleteTarget,
    profileId: number,
    setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>,
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>,
    setLanguages: React.Dispatch<React.SetStateAction<LanguageSkill[]>>
  ) => Promise<void>
}
