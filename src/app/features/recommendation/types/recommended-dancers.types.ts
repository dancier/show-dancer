export type RecommendedDancer = {
  id: string;
  name: string;
  imageHash: string | null;
  about: string | null;
  age: number;
  zip: string;
  city: string;
  dances: string[];
  score: number;
};
