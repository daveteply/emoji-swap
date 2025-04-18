import { Injectable } from '@angular/core';
import { AudioType } from 'src/app/services/audio-data';
import { AudioService } from 'src/app/services/audio.service';
import {
  CASCADE_BONUS,
  HINT_REDUCTION,
  MATCH_MINIUM_LENGTH,
  TIME_BONUS_CAP,
  TIME_SUPER_BONUS_CAP,
} from '../../constants';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';
import { GameSplashService, SplashType } from './game-splash.service';

@Injectable({
  providedIn: 'root',
})
export class ScoringService {
  private intervalId: string | number | NodeJS.Timer | undefined;
  private elapsed = 0;
  private isRunning = false;

  constructor(private audioService: AudioService, private gameSplashService: GameSplashService) {}

  public TimerStart(): void {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      const start = Date.now() - this.elapsed;
      this.intervalId = setInterval(() => {
        this.elapsed = Date.now() - start;
      });
    } else {
      clearInterval(this.intervalId);
    }
  }

  public TimerStop(): void {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  public TimerReset(): void {
    this.elapsed = 0;
    this.TimerStop();
  }

  public ApplyHint(level: number): number {
    const scoreDeduction = level * HINT_REDUCTION;
    this.gameSplashService.DoSplash({
      splashType: SplashType.HintLoss,
      scoreValue: scoreDeduction,
    });
    return scoreDeduction;
  }

  public ApplyCascade(level: number, cascadeLength: number): number {
    const cascadeBonus = level * cascadeLength * CASCADE_BONUS;
    this.gameSplashService.DoSplash({
      splashType: SplashType.CascadeBonus,
      scoreValue: cascadeBonus,
    });
    this.audioService.PlayAudio(AudioType.RareBonus);
    return cascadeBonus;
  }

  public ApplyScoring(gameBoard: GameBoard, matchSet: Array<GameTile>, level: number): void {
    let timeBonusTotal = 0;
    let superTimeBonusTotal = 0;
    let matchLengthBonusTotal = 0;

    for (const tile of matchSet) {
      gameBoard.grid[tile.rowInx][tile.colInx].score.baseScore = level;

      // time bonus
      if (this.elapsed) {
        if (this.elapsed <= TIME_SUPER_BONUS_CAP) {
          const timeBonusSuper = level * Math.floor((1 / this.elapsed) * TIME_BONUS_CAP) * 2;
          gameBoard.grid[tile.rowInx][tile.colInx].score.timeBonusSuper = timeBonusSuper;

          superTimeBonusTotal += timeBonusSuper;
        } else if (this.elapsed <= TIME_BONUS_CAP) {
          const timeBonus = level * Math.floor((1 / this.elapsed) * TIME_BONUS_CAP);
          gameBoard.grid[tile.rowInx][tile.colInx].score.timeBonus = timeBonus;

          timeBonusTotal += timeBonus;
        }
      }

      // match length bonus
      if (matchSet.length > MATCH_MINIUM_LENGTH) {
        const matchLengthBonus = level * matchSet.length;
        gameBoard.grid[tile.rowInx][tile.colInx].score.matchLengthBonus = matchLengthBonus;

        matchLengthBonusTotal += matchLengthBonus;
      }
    }

    if (superTimeBonusTotal) {
      this.gameSplashService.DoSplash({
        splashType: SplashType.SuperTimeBonus,
        scoreValue: superTimeBonusTotal,
      });
      this.audioService.PlayAudio(AudioType.RareBonus);
    }

    if (timeBonusTotal) {
      this.gameSplashService.DoSplash({
        splashType: SplashType.TimeBonus,
        scoreValue: timeBonusTotal,
      });
      this.audioService.PlayAudio(AudioType.TimeBonus);
    }

    if (matchLengthBonusTotal) {
      this.gameSplashService.DoSplash({
        splashType: SplashType.MatchLengthBonus,
        scoreValue: matchLengthBonusTotal,
      });
      this.audioService.PlayAudio(AudioType.RareBonus);
    }

    this.elapsed = 0;
  }

  public TallyScore(gameBoard: GameBoard): number {
    let score = 0;
    gameBoard?.grid.forEach((row) =>
      row
        .filter((t) => t.score)
        .forEach((tile) => {
          let tileScore = tile.score.baseScore;
          if (tile.score.timeBonus) {
            tileScore += tile.score.timeBonus;
          }
          if (tile.score.matchLengthBonus) {
            tileScore += tile.score.matchLengthBonus;
          }
          score += tileScore;
        })
    );

    return score;
  }

  OnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
