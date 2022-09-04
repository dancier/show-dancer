export type DanceLevel =
  | 'NO_EXPERIENCE'
  | 'BASIC'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'PRO';

export const levelDescription: Record<DanceLevel, string> = {
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

export type DanceRole = 'LEADING' | 'FOLLOWING';

export type DanceTypes = 'TANGO' | 'SALSA' | 'STANDARD';

// export type DancePreferences = {
//   dance: DanceTypes;
//   level: DanceLevel;
//   leading: DanceRole;
// };

export type Dance = {
  type: DanceTypes;
  level: DanceLevel;
  leading: DanceRole;
};

export type Profile = {
  id?: string;
  aboutMe: string;
  size: number;
  gender: Gender;
  dancerName: string;
  birthDate: string;
  ableTo: Dance[];
  wantsTo: Dance[];
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
