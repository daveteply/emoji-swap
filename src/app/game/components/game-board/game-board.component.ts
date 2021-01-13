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
import { AudioService } from '../../../services/audio.service';
import { AudioType } from 'src/app/services/audio-data';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  public boardDisabled = false;
  public gameBoard!: GameBoard;

  private score = 0;
  private level = 1;
  private matchSetCount = 0;
  public matchProgress = 0;

  private matchSets: Array<Array<GameTile>> = [];
  private currentMatchSet: Array<GameTile> = [];
  private potentialMatchSets: Array<Array<GameTile>> = [];

  private readonly GAME_BOARD_ROWS: number = 7;
  private readonly GAME_BOARD_COLUMNS: number = 5;
  private readonly MATCH_SET_COUNT_NEXT_LEVEL = 8;
  private readonly AUTHORED_LEVEL_COUNT = 5;

  private subscription: Subject<boolean> = new Subject<boolean>();

  private swapInProgress = false;

  @Output() scoreUpdated = new EventEmitter();
  @Output() levelUpdated = new EventEmitter();

  constructor(
    private gameService: GameService,
    private gameLoopService: GameLoopService,
    private tileRemoveService: TileRemoveService,
    private gameInteractionsService: GameInteractionsService,
    private audioService: AudioService
  ) {}

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
              this.matchSetCount++;
              this.swapInProgress = false;
              this.audioService.PlayAudio(AudioType.MatchFound);
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
            this.gameService.ApplyScoring(
              this.gameBoard,
              this.currentMatchSet,
              this.level
            );
            this.score += this.gameService.TallyScore(this.gameBoard);
            this.scoreUpdated.emit(this.score);

            this.matchProgress =
              (this.matchSetCount / this.MATCH_SET_COUNT_NEXT_LEVEL) * 100;

            // level change
            if (this.matchSetCount >= this.MATCH_SET_COUNT_NEXT_LEVEL) {
              this.nextLevel();
            } else {
              this.gameLoopService.DoStep(GameLoopSteps.FindMatches);
            }
            break;

          case GameLoopSteps.UnlockBoard:
            this.boardDisabled = false;
            break;
        }
      });

    this.tileRemoveService.tileRemoveState$
      .pipe(delay(100))
      .pipe(takeUntil(this.subscription))
      .subscribe((step) => {
        switch (step) {
          case TileRemoveSteps.SetToRemove:
            this.tileRemoveService.SetToRemove(this.gameBoard);
            break;

          case TileRemoveSteps.NextTile:
            this.gameService.ReIndexGrid(this.gameBoard);
            this.tileRemoveService.NextTile(
              this.gameService.NewTile(0, 0, this.levelToRender())
            );
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
              this.audioService.PlayAudio(AudioType.Swipe);
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
            this.audioService.PlayAudio(AudioType.InvalidSwipe);
            break;

          case InteractionSteps.ShowHint:
            this.audioService.PlayAudio(AudioType.Hint);
            this.gameService.ReIndexGrid(this.gameBoard);
            this.gameInteractionsService.ApplyPotentials(
              this.gameBoard,
              this.potentialMatchSets,
              true
            );
            break;
        }
      });

    this.NewGame();
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.complete();
  }

  public NewGame(nextLevel: boolean = false): void {
    if (!nextLevel) {
      this.score = 0;
      this.scoreUpdated.emit(this.score);
      this.level = 1;
      this.levelUpdated.emit(this.level);
    }
    this.matchProgress = 0;

    this.gameBoard = this.gameService.CreateGame(
      this.GAME_BOARD_ROWS,
      this.GAME_BOARD_COLUMNS,
      this.levelToRender()
    );

    this.gameLoopService.DoStep(GameLoopSteps.LockBoard);

    this.audioService.PlayAudio(AudioType.LevelChange);
  }

  public Hint(): void {
    this.gameInteractionsService.DoStep(InteractionSteps.ShowHint);
    const scoreDeduction = this.level * 25;
    if (this.score - scoreDeduction > Number.MIN_SAFE_INTEGER) {
      this.score -= scoreDeduction;
      this.scoreUpdated.emit(this.score);
    }
  }

  private nextLevel(): void {
    this.matchSetCount = 0;
    this.level++;

    this.levelUpdated.emit(this.level);
    this.NewGame(true);
  }

  private levelToRender(): number {
    const next = this.level % this.AUTHORED_LEVEL_COUNT;
    return next === 0 ? this.AUTHORED_LEVEL_COUNT : next;
  }
}
