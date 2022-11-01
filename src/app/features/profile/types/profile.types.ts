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

export type DanceRole = 'LEAD' | 'FOLLOW' | 'BOTH';

export type DanceType = string;

export type Dance = {
  dance: DanceType;
  level: DanceLevel;
  leading: DanceRole;
};

export type PersonalData = {
  size: number;
  gender: Gender;
  birthDate: string;
  zipCode: string;
};

export type Profile = PersonalData & {
  id?: string;
  aboutMe: string;
  dancerName: string;
  ableTo: Dance[];
  wantsTo: Dance[];
  email: string;
  city: string;
  country: string;
  profileImageHash: string;
  [key: string]: any;
};

export type NameAvailability = {
  available: boolean;
};

export type Location = {
  id: string;
  zipCode: string;
  country: string;
  longitude: number;
  latitude: number;
  city: string;
};

export type UploadedImageDao = {
  hash: string;
};
