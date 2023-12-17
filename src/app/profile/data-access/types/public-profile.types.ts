import { Dance, Gender } from './profile.types';

export type PublicProfile = {
  id: string;
  size: number;
  gender: Gender;
  dancerName: string;
  age: number;
  ableTo: Dance[];
  wantsTo: Dance[];
  city: string;
  country: string;
  profileImageHash: string;
  aboutMe: string;
};
