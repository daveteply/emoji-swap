export interface GameTile {
  code: string;
  version: string;
  title: string;
  html: string;

  colInx: number;
  rowInx: number;

  matched?: boolean;
  potential?: boolean;
  score: number;

  toRemove?: boolean;
  animateRemove?: boolean;

  animateSlideUp?: boolean;
  animateSlideRight?: boolean;
  animateSlideDown?: boolean;
  animateSlideLeft?: boolean;

  animateShutter?: boolean;
}
