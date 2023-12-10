import { RecommendedDancer } from './recommended-dancers.types';

export type RecommendationsDto = RecommendationDto[];

export type RecommendationDto = {
  type: 'DANCER';
  payload: RecommendedDancer;
};
