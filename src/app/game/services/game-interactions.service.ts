import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';
import { PlayerTile } from '../models/player-tile';
import { GameUtilityService } from './game-utility.service';
import { ScoringService } from './scoring.service';
import { GameGestures, IPanEvent, SwipeDirection } from './game-gestures';

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
  private isPanning = false;

  constructor(
    private gameUtilityService: GameUtilityService,
    private scoringService: ScoringService,
    private gameGesturesService: GameGestures
  ) {}

  public registerGestureElement(element: HTMLElement, tile: GameTile): void {
    this.gameGesturesService.registerElement(element);
    this.gameGesturesService.pan$.subscribe((panEvent: IPanEvent) => {
      // Only process pan if it's from this element
      if (panEvent.element === element) {
        this.handlePanEvent(panEvent, tile);
      }
    });
  }

  private handlePanEvent(panEvent: IPanEvent, tile: GameTile): void {
    if (!panEvent.direction) return;

    // Map SwipeDirection to PlayerSwipeDirection
    const playerDirection = this.mapSwipeDirectionToPlayerDirection(panEvent.direction);

    if (!panEvent.isFinal && !this.isPanning) {
      // Pan started - initialize player tile (only once)
      this.isPanning = true;
      this.playerTile = {
        tile: tile,
        direction: playerDirection,
      };
      this.TileSwiped(this.playerTile);
    } else if (!panEvent.isFinal && this.isPanning) {
      // Pan continuing - update direction
      this.playerTile.direction = playerDirection;
    } else if (panEvent.isFinal) {
      // Pan ended
      this.isPanning = false;
    }
  }

  private mapSwipeDirectionToPlayerDirection(direction: SwipeDirection): PlayerSwipeDirection {
    switch (direction) {
      case SwipeDirection.Up:
        return PlayerSwipeDirection.Up;
      case SwipeDirection.Down:
        return PlayerSwipeDirection.Down;
      case SwipeDirection.Left:
        return PlayerSwipeDirection.Left;
      case SwipeDirection.Right:
        return PlayerSwipeDirection.Right;
    }
  }

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
