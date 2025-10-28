import { gql } from '@apollo/client'

export const REFRESH_TOKEN = gql`
  mutation {
    refreshToken {
      token
      userId
      email
    }
  }
`

export const LOGOUT = gql`
  mutation {
    logout
  }
`

// Auth
export const LOGIN = gql`
  mutation ($email: String!, $password: String!, $rememberMe: Boolean) {
    login(email: $email, password: $password, rememberMe: $rememberMe) {
      token
    }
  }
`

export const REGISTER = gql`
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      email
      userId
    }
  }
`

// Me
export const ME = gql`
  query GetMe {
    me
  }
`

// Profile
export const GET_PROFILE = gql`
  query GetUserProfile($userId: Int!) {
    userProfile(userId: $userId) {
      id
      fullName
      linkedinUrl
      githubUrl
      portfolioUrl
      location
      availability
      title
      summary
      skills
      profilePhotoUrl
      gender
      tone
    }
  }
`

export const UPSERT_PROFILE = gql`
  mutation UpsertUserProfile($userId: Int!, $input: UserProfileInput!) {
    upsertUserProfile(userId: $userId, input: $input) {
      id
      userId
      fullName
      linkedinUrl
      githubUrl
      portfolioUrl
      location
      availability
      title
      summary
      skills
      profilePhotoUrl
      gender
      tone
    }
  }
`

export const UPLOAD_PROFILE_PHOTO = gql`
  mutation UploadProfilePhoto($userId: Int!, $file: Upload!) {
    uploadProfilePhoto(userId: $userId, file: $file) {
      id
      userId
      profilePhotoUrl
    }
  }
`

export const UPLOAD_PROFILE_PHOTO_BASE64 = gql`
  mutation UploadProfilePhotoBase64(
    $userId: Int!
    $data: String!
    $filename: String
    $contentType: String
  ) {
    uploadProfilePhotoBase64(
      userId: $userId
      data: $data
      filename: $filename
      contentType: $contentType
    ) {
      id
      userId
      profilePhotoUrl
    }
  }
`

export const CREATE_DOWNLOAD_URL = gql`
  mutation CreateDownloadUrl($key: String!, $bucket: String, $expiresSeconds: Int) {
    createDownloadUrl(key: $key, bucket: $bucket, expiresSeconds: $expiresSeconds)
  }
`

// Password reset
export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $new: String!) {
    resetPassword(token: $token, newPassword: $new)
  }
`

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`

// New: user experiences / education / languages
export const USER_EXPERIENCES = gql`
  query UserExperiences($profileId: Int!) {
    userExperiences(profileId: $profileId) {
      id
      title
      company
      location
      status
      startDate
      endDate
      description
      keywords
    }
  }
`

export const USER_EDUCATION = gql`
  query UserEducation($profileId: Int!) {
    userEducation(profileId: $profileId) {
      id
      degree
      school
      location
      startDate
      endDate
      description
    }
  }
`

export const USER_LANGUAGES = gql`
  query UserLanguages($profileId: Int!) {
    userLanguages(profileId: $profileId) {
      id
      name
      level
    }
  }
`

// Mutations: experiences
export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: ExperienceInput!) {
    createExperience(input: $input) {
      id
    }
  }
`
export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($input: ExperienceUpdateInput!) {
    updateExperience(input: $input) {
      id
    }
  }
`
export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: Int!) {
    deleteExperience(id: $id)
  }
`

// Mutations: education
export const CREATE_EDUCATION = gql`
  mutation CreateEducation($input: EducationInput!) {
    createEducation(input: $input) {
      id
    }
  }
`
export const UPDATE_EDUCATION = gql`
  mutation UpdateEducation($input: EducationUpdateInput!) {
    updateEducation(input: $input) {
      id
    }
  }
`
export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: Int!) {
    deleteEducation(id: $id)
  }
`

// Mutations: languages (à implémenter côté backend si nécessaire)
export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($input: LanguageInput!) {
    createLanguage(input: $input) {
      id
    }
  }
`
export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($input: LanguageUpdateInput!) {
    updateLanguage(input: $input) {
      id
    }
  }
`
export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($id: Int!) {
    deleteLanguage(id: $id)
  }
`

export const IMPORT_PROFILE = gql`
  mutation ImportUserProfile($userId: Int!, $data: JSON!) {
    importUserProfile(userId: $userId, data: $data) {
      id
    }
  }
`

export const ANALYZE_OFFER_TEXT_ASYNC = gql`
  mutation AnalyzeOfferFromTextAsync($userId: Int!, $text: String!) {
    analyzeOfferFromTextAsync(userId: $userId, text: $text)
  }
`

export const GENERATE_DOCS_ASYNC = gql`
  mutation GenerateDocumentsAndApplicationAsync($userId: Int!, $offerId: Int!) {
    generateDocumentsAndApplicationAsync(userId: $userId, offerId: $offerId)
  }
`

export const TASK_BY_ID = gql`
  query Task($id: String!) {
    task(id: $id) {
      id
      status
      statusMessage
      progress
      result
      errorMessage
    }
  }
`
