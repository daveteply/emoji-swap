import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';
import { PlayerTile } from '../models/player-tile';
import { GameUtilityService } from './game-utility.service';
import { ScoringService } from './scoring.service';

// https://hammerjs.github.io/api/#constants
export enum PlayerSwipeDirection {
  Left = 2,
  Right = 4,
  Up = 8,
  Down = 16,
}

export enum InteractionSteps {
  LocateAdjacentTile,
  ApplyDirectionalAnimation,
  Swap,
  SwapBack,
  Shutter,
  ShowHint,
}

@Injectable({
  providedIn: 'root',
})
export class GameInteractionsService {
  private gameInteractionStateSource = new Subject<InteractionSteps>();
  public gameInteractionState$ = this.gameInteractionStateSource.asObservable();

  private playerTile!: PlayerTile;
  private adjacentTile!: GameTile;

  private isSwapBack = false;

  constructor(private gameUtilityService: GameUtilityService, private scoringService: ScoringService) {}

  public DoStep(step: InteractionSteps): void {
    this.gameInteractionStateSource.next(step);
  }

  // launched by player interaction with GameTile
  public TileSwiped(playerTile: PlayerTile): void {
    this.playerTile = playerTile;
    this.adjacentTile = {} as GameTile;
    this.gameInteractionStateSource.next(InteractionSteps.LocateAdjacentTile);

    this.scoringService.TimerStop();
  }

  public LocateAdjacentTile(gameBoard: GameBoard): boolean {
    let nextRowInx = this.playerTile.tile.rowInx;
    let nextColInx = this.playerTile.tile.colInx;

    // https://hammerjs.github.io/api/#constants DIRECTION_NONE 	1
    // if (this.playerTile.direction !== 1) {
    switch (this.playerTile.direction) {
      case PlayerSwipeDirection.Up:
        nextRowInx--;
        break;

      case PlayerSwipeDirection.Right:
        nextColInx++;
        break;

      case PlayerSwipeDirection.Down:
        nextRowInx++;
        break;

      case PlayerSwipeDirection.Left:
        nextColInx--;
        break;
    }

    if (this.gameUtilityService.WithinGrid(nextRowInx, nextColInx, gameBoard)) {
      this.adjacentTile = gameBoard.grid[nextRowInx][nextColInx];
      return true;
    }
    // }

    // shutter
    gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx].animateShutter = false;
    this.gameInteractionStateSource.next(InteractionSteps.Shutter);
    return false;
  }

  public SetDirectionalAnimationClass(gameBoard: GameBoard): void {
    switch (this.playerTile.direction) {
      case PlayerSwipeDirection.Up:
        gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx].animateSlideUp = true;
        gameBoard.grid[this.adjacentTile.rowInx][this.adjacentTile.colInx].animateSlideDown = true;
        break;

      case PlayerSwipeDirection.Right:
        gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx].animateSlideRight = true;
        gameBoard.grid[this.adjacentTile.rowInx][this.adjacentTile.colInx].animateSlideLeft = true;
        break;

      case PlayerSwipeDirection.Down:
        gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx].animateSlideDown = true;
        gameBoard.grid[this.adjacentTile.rowInx][this.adjacentTile.colInx].animateSlideUp = true;
        break;

      case PlayerSwipeDirection.Left:
        gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx].animateSlideLeft = true;
        gameBoard.grid[this.adjacentTile.rowInx][this.adjacentTile.colInx].animateSlideRight = true;
        break;
    }

    this.gameInteractionStateSource.next(InteractionSteps.Swap);
  }

  public Swap(gameBoard: GameBoard): void {
    const saveCurrent = Object.assign({}, gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx]);

    const saveAdjacent = Object.assign({}, gameBoard.grid[this.adjacentTile.rowInx][this.adjacentTile.colInx]);

    gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx] = saveAdjacent;

    gameBoard.grid[this.adjacentTile.rowInx][this.adjacentTile.colInx] = saveCurrent;
  }

  public SwapBack(): void {
    this.isSwapBack = !this.isSwapBack;
    if (this.isSwapBack) {
      this.gameInteractionStateSource.next(InteractionSteps.LocateAdjacentTile);
    }
  }

  public Shutter(gameBoard: GameBoard): void {
    gameBoard.grid[this.playerTile.tile.rowInx][this.playerTile.tile.colInx].animateShutter = true;
  }

  public ApplyPotentials(gameBoard: GameBoard, potentialMatchSets: Array<Array<GameTile>>, random: boolean): void {
    if (gameBoard && potentialMatchSets?.length) {
      if (random) {
        const targetMatchSet = potentialMatchSets[Math.floor(Math.random() * potentialMatchSets.length)];
        this.applyPotentialClass(targetMatchSet, gameBoard);
      } else {
        for (const potentialMatchSet of potentialMatchSets) {
          this.applyPotentialClass(potentialMatchSet, gameBoard);
        }
      }
    }
  }

  private applyPotentialClass(potentialMatchSet: Array<GameTile>, gameBoard: GameBoard): void {
    for (const tile of potentialMatchSet) {
      gameBoard.grid[tile.rowInx][tile.colInx].potential = true;
    }
  }
}
