import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface GameSplash {
  splashType: SplashType;
  scoreValue?: number;
  timestamp?: number;
}

export enum SplashType {
  TimeBonus,
  SuperTimeBonus,
  MatchLengthBonus,
  CascadeBonus,
  HintLoss,
  NoMoreMoves,
}

@Injectable({
  providedIn: 'root',
})
export class GameSplashService {
  private gameSplashStateSource = new Subject<GameSplash>();
  public gameSplashState$ = this.gameSplashStateSource.asObservable();

  public DoSplash(splash: GameSplash): void {
    this.gameSplashStateSource.next(splash);
  }
}
