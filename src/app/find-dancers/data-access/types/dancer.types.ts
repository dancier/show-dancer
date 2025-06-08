export interface Dancer {
  id: string;
  dancerName: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  city: string;
  country: string;
  size: number;
  profileImageHash: string;
  aboutMe: string;
  ableTo: string[];
  wantsTo: string[];
}

export interface DancerSearchFilters {
  gender?: 'ALL' | 'MALE' | 'FEMALE';
  distance?: number;
}

export interface DancerSearchParams {
  gender?: 'MALE' | 'FEMALE';
  range?: number;
}
