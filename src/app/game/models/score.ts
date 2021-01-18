export enum ScoreType {
  TimeBonus,
  SuperTimeBonus,
  MatchLengthBonus,
  HintLoss,
  CascadeBonus,
}

export interface TileScore {
  baseScore: number;
  timeBonusSuper?: number;
  timeBonus?: number;
  matchLengthBonus?: number;
}

export interface TileScoreSplash {
  scoreType: ScoreType;
  scoreValue?: number;
  timestamp?: number;
}
