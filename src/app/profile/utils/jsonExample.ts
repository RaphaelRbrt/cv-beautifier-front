import type { ProfileImportData } from '../types'

export const PROFILE_EXAMPLE_JSON: ProfileImportData = {
  profile: {
    fullName: '',
    title: '',
    summary: '',
    skills: [],
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    location: '',
    availability: '',
    gender: '',
    tone: '',
  },
  experiences: [
    {
      title: '',
      company: '',
      location: '',
      status: 'CDI',
      startDate: 'YYYY-MM',
      endDate: '',
      description: '',
      keywords: [],
    },
  ],
  education: [
    {
      degree: '',
      school: '',
      location: '',
      startDate: 'YYYY-MM',
      endDate: '',
      description: '',
    },
  ],
  languages: [{ name: '', level: '' }],
}

export function downloadExampleJson(): void {
  const blob = new Blob([JSON.stringify(PROFILE_EXAMPLE_JSON, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'cvb-profile-example.json'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
