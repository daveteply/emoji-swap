import { TileScore } from './score';

export interface GameTile {
  code: string;
  title: string;
  html: string;

  colInx: number;
  rowInx: number;

  isNew?: number;
  matched?: boolean;
  potential?: boolean;
  score: TileScore;

  toRemove?: boolean;
  animateRemove?: boolean;

  animateSlideUp?: boolean;
  animateSlideRight?: boolean;
  animateSlideDown?: boolean;
  animateSlideLeft?: boolean;

  animateShutter?: boolean;
}
