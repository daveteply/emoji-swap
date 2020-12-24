import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { GameBoard } from '../../models/game-board';
import {
  GameInteractionsService,
  InteractionSteps,
} from '../../services/game-interactions.service';
import { GameService } from '../../services/game.service';
import { delay, takeUntil } from 'rxjs/operators';
import { GameTile } from '../../models/game-tile';
import {
  GameLoopService,
  GameLoopSteps,
} from '../../services/game-loop.service';
import { Subject } from 'rxjs';
import {
  TileRemoveService,
  TileRemoveSteps,
} from '../../services/tile-remove.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  gameBoard: GameBoard;
  score = 0;
  boardDisabled = false;
  private matchSets: Array<Array<GameTile>> = [];
  private currentMatchSet: Array<GameTile> = [];
  private potentialMatchSets: Array<Array<GameTile>> = [];

  @Output() scoreUpdated = new EventEmitter();

  private readonly GAME_BOARD_ROWS: number = 7;
  private readonly GAME_BOARD_COLUMNS: number = 5;

  private subscription: Subject<boolean> = new Subject<boolean>();

  private swapInProgress = false;

  constructor(
    private gameService: GameService,
    private gameLoopService: GameLoopService,
    private tileRemoveService: TileRemoveService,
    private gameInteractionsService: GameInteractionsService
  ) {
    this.gameBoard = this.gameService.CreateGame(
      this.GAME_BOARD_ROWS,
      this.GAME_BOARD_COLUMNS
    );
    console.log('created', this.gameBoard);
  }

  ngOnInit(): void {
    this.gameLoopService.gameLoopState$
      .pipe(delay(50))
      .pipe(takeUntil(this.subscription))
      .subscribe((step) => {
        switch (step) {
          case GameLoopSteps.LockBoard:
            this.boardDisabled = true;
            this.gameLoopService.DoStep(GameLoopSteps.FindMatches);
            break;

          case GameLoopSteps.FindMatches:
            this.gameService.FindMatchesAndPotentials(this.gameBoard);
            this.matchSets = this.gameService.currentMatchSets;
            this.potentialMatchSets = this.gameService.currentPotentialMatches;

            this.gameLoopService.DoStep(GameLoopSteps.RemoveMatchSet);
            break;

          case GameLoopSteps.RemoveMatchSet:
            if (this.matchSets.length) {
              this.currentMatchSet = this.matchSets.shift() as Array<GameTile>;
              this.tileRemoveService.StartTileDeletion(
                this.currentMatchSet.map((t) => Object.assign({}, t))
              );
              this.swapInProgress = false;
            } else {
              // check for swap
              if (this.swapInProgress) {
                this.gameInteractionsService.DoStep(InteractionSteps.SwapBack);
                this.swapInProgress = false;
              }
              if (this.potentialMatchSets.length) {
                this.gameLoopService.DoStep(GameLoopSteps.UnlockBoard);
              }
            }
            break;

          case GameLoopSteps.ApplyScoring:
            this.gameService.ApplyScoring(this.gameBoard, this.currentMatchSet);
            this.score += this.gameService.TallyScore(this.gameBoard);
            this.scoreUpdated.emit(this.score);

            this.gameLoopService.DoStep(GameLoopSteps.FindMatches);

            // loop: continue to check for any new matches
            // this.gameLoopService.DoStep(GameLoopSteps.FindMatches);

            break;
          case GameLoopSteps.UnlockBoard:
            this.boardDisabled = false;
            break;
        }
      });

    this.tileRemoveService.tileRemoveState$
      .pipe(delay(150))
      .pipe(takeUntil(this.subscription))
      .subscribe((step) => {
        switch (step) {
          case TileRemoveSteps.SetToRemove:
            this.tileRemoveService.SetToRemove(this.gameBoard);
            break;

          case TileRemoveSteps.NextTile:
            this.gameService.ReIndexGrid(this.gameBoard);
            this.tileRemoveService.NextTile(this.gameService.NewTile(0, 0));
            break;

          case TileRemoveSteps.ApplyRemoveClass:
            this.tileRemoveService.ApplyRemoveClass(this.gameBoard);
            break;

          case TileRemoveSteps.ApplyDropClass:
            this.tileRemoveService.ApplyDropClass(this.gameBoard);
            break;

          case TileRemoveSteps.Shift:
            this.tileRemoveService.Shift(this.gameBoard);
            break;

          case TileRemoveSteps.Complete:
            this.gameLoopService.DoStep(GameLoopSteps.ApplyScoring);
            break;
        }
      });

    this.gameInteractionsService.gameInteractionState$
      .pipe(delay(100))
      .pipe(takeUntil(this.subscription))
      .subscribe((step) => {
        switch (step) {
          case InteractionSteps.LocateAdjacentTile:
            if (
              this.gameInteractionsService.LocateAdjacentTile(this.gameBoard)
            ) {
              this.swapInProgress = true;
              this.gameInteractionsService.DoStep(
                InteractionSteps.ApplyDirectionalAnimation
              );
            }
            break;

          case InteractionSteps.ApplyDirectionalAnimation:
            this.gameInteractionsService.SetDirectionalAnimationClass(
              this.gameBoard
            );
            break;

          case InteractionSteps.Swap:
            this.gameInteractionsService.Swap(this.gameBoard);
            this.gameService.ReIndexGrid(this.gameBoard);
            this.gameLoopService.DoStep(GameLoopSteps.LockBoard);
            break;

          case InteractionSteps.SwapBack:
            this.gameInteractionsService.SwapBack();
            break;

          case InteractionSteps.Shutter:
            this.gameInteractionsService.Shutter(this.gameBoard);
            break;
        }
      });

    this.gameLoopService.DoStep(GameLoopSteps.LockBoard);
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.complete();
  }

  // const potentials = this.gameService.potentialMatches;
  // this.gameService.ApplyPotentials(this.gameBoard, potentials);
}
