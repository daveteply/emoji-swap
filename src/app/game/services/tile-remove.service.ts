import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AudioType } from 'src/app/services/audio-data';
import { AudioService } from 'src/app/services/audio.service';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';

export enum TileRemoveSteps {
  SetToRemove,
  NextTile,
  ApplyRemoveClass,
  ApplyDropClass,
  Shift,
  Complete,
}

@Injectable({
  providedIn: 'root',
})
export class TileRemoveService {
  private tileRemoveStateSource = new Subject<TileRemoveSteps>();
  private tilesToRemove: Array<GameTile> = [];
  private currentTile!: GameTile;
  private newTile!: GameTile;

  constructor(private audioService: AudioService) {}

  public tileRemoveState$ = this.tileRemoveStateSource.asObservable();

  public StartTileDeletion(matchSets: Array<GameTile>): void {
    // establish list of tiles to remove (tile removal should be top-down)
    this.tilesToRemove = matchSets;
    // start loop
    this.tileRemoveStateSource.next(TileRemoveSteps.SetToRemove);
  }

  public SetToRemove(gameBoard: GameBoard): void {
    this.tilesToRemove.forEach((tile) => {
      gameBoard.grid[tile.rowInx][tile.colInx].toRemove = true;
    });
    this.tileRemoveStateSource.next(TileRemoveSteps.NextTile);
  }

  public NextTile(newTile: GameTile): void {
    if (this.tilesToRemove.length) {
      this.currentTile = this.tilesToRemove.shift() as GameTile;

      // newTile
      newTile.colInx = this.currentTile.colInx;
      this.newTile = newTile;

      this.tileRemoveStateSource.next(TileRemoveSteps.ApplyRemoveClass);
    } else {
      this.tileRemoveStateSource.next(TileRemoveSteps.Complete);
    }
  }

  public ApplyRemoveClass(gameBoard: GameBoard): void {
    gameBoard.grid[this.currentTile.rowInx][this.currentTile.colInx].animateRemove = true;

    this.tileRemoveStateSource.next(TileRemoveSteps.ApplyDropClass);
    this.audioService.PlayAudio(AudioType.TileRemove, true);
  }

  public ApplyDropClass(gameBoard: GameBoard): void {
    let nextRowInx = this.currentTile.rowInx;
    while (nextRowInx > 0) {
      nextRowInx--;
      gameBoard.grid[nextRowInx][this.currentTile.colInx].animateSlideDown = true;
    }

    this.tileRemoveStateSource.next(TileRemoveSteps.Shift);
  }

  public Shift(gameBoard: GameBoard): void {
    let nextRowInx = this.currentTile.rowInx;
    const colInx = this.currentTile.colInx;
    while (nextRowInx > 0) {
      nextRowInx--;

      const nextTile = Object.assign({}, gameBoard.grid[nextRowInx][colInx]);
      nextTile.rowInx = nextRowInx + 1;
      nextTile.animateSlideDown = false;

      gameBoard.grid[nextRowInx + 1][colInx] = nextTile;
    }

    gameBoard.grid[0][colInx] = this.newTile;

    // loop
    this.tileRemoveStateSource.next(TileRemoveSteps.NextTile);
  }
}
