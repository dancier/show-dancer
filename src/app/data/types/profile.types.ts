export type Level =
  | 'NO_EXPERIENCE'
  | 'BASIC'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'PRO';

export const levelDescription: Record<Level, string> = {
  NO_EXPERIENCE: 'Keine Erfahrung',
  BASIC: 'Beginner',
  INTERMEDIATE: 'Medium',
  ADVANCED: 'Fortschritten',
  PRO: 'Professionell',
} as const;

export type Gender = 'MALE' | 'FEMALE' | 'DIVERS' | 'NA';

export type GenderDescription = {
  type: Gender;
  description: string;
};

export const genderList: GenderDescription[] = [
  {
    type: 'MALE',
    description: 'männlich',
  },
  {
    type: 'FEMALE',
    description: 'weiblich',
  },
  {
    type: 'DIVERS',
    description: 'divers',
  },
  {
    type: 'NA',
    description: 'keine Angabe',
  },
];

export type Role = 'LEADING' | 'FOLLOWING';

export type DanceTypes = 'TANGO' | 'SALSA' | 'STANDARD';

export type DancePreferences = {
  dance: DanceTypes;
  level: Level;
  leading: Role;
};

export type Dance = {
  dance?: DanceTypes;
  level?: Level;
  leading?: Role;
};

export type Profile = {
  id?: string;
  aboutMe: string;
  size: number;
  gender: Gender;
  dancerName: string;
  birthDate: string;
  ableTo: DancePreferences[];
  wantsTo: DancePreferences[];
  email: string;
  zipCode: string;
  city: string;
  country: string;
  profileImageHash: string;
  [key: string]: any;
};

export type PersonalData = {
  size: number;
  gender: Gender;
  birthDate: string;
  zipCode: string;
};

export type NameAvailability = {
  available: boolean;
};
