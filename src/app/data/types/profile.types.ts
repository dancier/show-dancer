export type Level =
  | 'NO_EXPERIENCE'
  | 'BASIC'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'PRO'

export const levelDescription: Record<Level, string> = {
  NO_EXPERIENCE: 'Keine Erfahrung',
  BASIC: 'Beginner',
  INTERMEDIATE: 'Medium',
  ADVANCED: 'Fortschritten',
  PRO: 'Professionell'
} as const;

export type Gender =
  | 'MALE'
  | 'FEMALE'
  | 'DIVERSE'

export type ROLE =
  | 'LEADING'
  | 'FOLLOWING'

export type DancePreferences = {
  dance: string,
  level: Level,
  leading: ROLE
}
export type Profile = {
    id?: string,
    aboutMe: string,
    size: number,
    gender: Gender,
    dancerName: string,
    birthDate: string,
    ableTo: DancePreferences[],
    wantsTo: DancePreferences[],
    email: string,
    zipCode: string,
    city: string,
    country: string,
    profileImageHash: string,
}

export type NameAvailability = {
  isAvailable: true
}
