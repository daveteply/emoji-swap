export interface GameTile {
  code: string;
  title: string;
  html: string;

  colInx: number;
  rowInx: number;

  isNew?: number;
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
