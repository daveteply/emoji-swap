import { Injectable } from '@angular/core';
import { MATCH_MINIUM_LENGTH, TIME_BONUS_CAP } from '../game-constants';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';

@Injectable({
  providedIn: 'root',
})
export class ScoringService {
  private intervalId = 0;

  private elapsed = 0;
  private isRunning = false;

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

  public ApplyScoring(
    gameBoard: GameBoard,
    matchSet: Array<GameTile>,
    level: number
  ): void {
    for (const tile of matchSet) {
      gameBoard.grid[tile.rowInx][tile.colInx].score.baseScore = level;

      // time bonus
      if (this.elapsed && this.elapsed <= TIME_BONUS_CAP) {
        gameBoard.grid[tile.rowInx][tile.colInx].score.timeBonus = Math.floor(
          (1 / this.elapsed) * TIME_BONUS_CAP
        );
      }

      // match length bonus
      if (matchSet.length > MATCH_MINIUM_LENGTH) {
        gameBoard.grid[tile.rowInx][tile.colInx].score.matchLengthBonus =
          matchSet.length;
      }
    }

    this.elapsed = 0;
  }

  public TallyScore(gameBoard: GameBoard): number {
    let score = 0;
    gameBoard?.grid.forEach((row) =>
      row.forEach((tile) => {
        let tileScore = tile.score.baseScore;
        if (tile.score.timeBonus) {
          tileScore *= tile.score.timeBonus;
        }
        if (tile.score.matchLengthBonus) {
          tileScore *= tile.score.matchLengthBonus;
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
