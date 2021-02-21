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
import { ScoringService } from '../../services/scoring.service';
import {
  AUTHORED_LEVEL_COUNT,
  DEFAULT_GAME_BOARD_COLUMNS_COUNT,
  DEFAULT_GAME_BOARD_ROW_COUNT,
  MATCH_SET_COUNT_NEXT_LEVEL,
} from '../../game-constants';
import { MatDialog } from '@angular/material/dialog';
import {
  GameSplashService,
  SplashType,
} from '../../services/game-splash.service';
import { GameOverComponent } from '../game-over/game-over.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  public boardDisabled = false;
  public hintDisabled = false;
  public gameBoard!: GameBoard;

  private score = 0;
  private levelScore = 0;
  private level = 1;
  private matchSetCount = 0;
  public matchProgress = 0;
  private cascadeCount = 0;

  private gridRows = DEFAULT_GAME_BOARD_ROW_COUNT;
  private gridColumns = DEFAULT_GAME_BOARD_COLUMNS_COUNT;

  private matchSets: Array<Array<GameTile>> = [];
  private currentMatchSet: Array<GameTile> = [];
  private potentialMatchSets: Array<Array<GameTile>> = [];

  private subscription: Subject<boolean> = new Subject<boolean>();

  private swapInProgress = false;

  @Output() scoreUpdated = new EventEmitter();
  @Output() levelUpdated = new EventEmitter();

  constructor(
    private gameService: GameService,
    private gameLoopService: GameLoopService,
    private tileRemoveService: TileRemoveService,
    private gameSplashService: GameSplashService,
    private gameInteractionsService: GameInteractionsService,
    private scoringService: ScoringService,
    private audioService: AudioService,
    private dialog: MatDialog,
    private router: Router
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
              this.audioService.PlayAudio(AudioType.MatchFound);
              this.currentMatchSet = this.matchSets.shift() as Array<GameTile>;

              // kick off the deletion sequence for the current match set
              this.tileRemoveService.StartTileDeletion(
                this.currentMatchSet.map((t) => Object.assign({}, t))
              );

              this.matchSetCount++;
              this.cascadeCount++;
              this.swapInProgress = false;

              this.hintDisabled = false;
            } else {
              // if no matches, and in the middle of a swap, swap back
              if (this.swapInProgress) {
                this.gameInteractionsService.DoStep(InteractionSteps.SwapBack);
                this.swapInProgress = false;
              }
              if (this.potentialMatchSets.length) {
                this.gameLoopService.DoStep(GameLoopSteps.UnlockBoard);
              } else {
                this.showGameOverDialog(true);
              }

              this.cascadeBonus();

              this.scoringService.TimerStart();
            }
            break;

          case GameLoopSteps.CompleteLoop:
            this.matchProgress =
              (this.matchSetCount / MATCH_SET_COUNT_NEXT_LEVEL) * 100;

            this.updateScore();

            // level change
            if (this.matchSetCount >= MATCH_SET_COUNT_NEXT_LEVEL) {
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
            this.gameLoopService.DoStep(GameLoopSteps.CompleteLoop);
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

    this.StartLevel();
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.complete();
  }

  public async StartLevel(nextLevel: boolean = false): Promise<void> {
    if (!nextLevel) {
      this.score = 0;
      this.scoreUpdated.emit(this.score);
      this.level = 1;
      this.levelUpdated.emit(this.level);
    }

    this.scoringService.TimerReset();

    this.hintDisabled = false;

    this.matchSetCount = 0;
    this.matchProgress = 0;
    this.cascadeCount = 0;
    this.levelScore = 0;

    this.gameBoard = this.gameService.CreateGame(
      DEFAULT_GAME_BOARD_ROW_COUNT,
      DEFAULT_GAME_BOARD_COLUMNS_COUNT,
      this.levelToRender()
    );

    this.audioService.PlayAudio(AudioType.LevelChange);
    await this.forceDelay(750);

    this.gameLoopService.DoStep(GameLoopSteps.LockBoard);
  }

  public UseHint(): void {
    this.hintDisabled = true;
    this.gameInteractionsService.DoStep(InteractionSteps.ShowHint);

    const scoreDeduction = this.scoringService.ApplyHint(this.level);

    if (this.score - scoreDeduction > Number.MIN_SAFE_INTEGER) {
      this.score -= scoreDeduction;
      this.levelScore -= scoreDeduction;
      this.scoreUpdated.emit(this.score);
    }
  }

  private nextLevel(): void {
    this.matchSetCount = 0;
    this.cascadeBonus();
    this.level++;

    this.levelUpdated.emit(this.level);

    this.gameSplashService.DoSplash({ splashType: SplashType.LevelComplete });

    this.StartLevel(true);
  }

  private updateScore(): void {
    this.scoringService.ApplyScoring(
      this.gameBoard,
      this.currentMatchSet,
      this.level
    );
    const pointsGained = this.scoringService.TallyScore(this.gameBoard);
    this.levelScore += pointsGained;
    this.score += pointsGained;
    this.scoreUpdated.emit(this.score);
  }

  private cascadeBonus(): void {
    if (this.cascadeCount > 1) {
      const bonus = this.scoringService.ApplyCascade(
        this.level,
        this.cascadeCount
      );
      this.score += bonus;
      this.levelScore += bonus;
      this.scoreUpdated.emit(this.score);
    }
    this.cascadeCount = 0;
  }

  private levelToRender(): number {
    const next = this.level % AUTHORED_LEVEL_COUNT;
    return next === 0 ? AUTHORED_LEVEL_COUNT : next;
  }

  private forceDelay(ms: number): Promise<void> {
    return new Promise((p) => setTimeout(p, ms));
  }

  private showGameOverDialog(noMoreMoves: boolean = false): void {
    const dialogRef = this.dialog.open(GameOverComponent, {
      data: { level: this.level, noMoreMoves, levelScore: this.levelScore },
    });
    dialogRef.afterClosed().subscribe((newGame) => {
      if (newGame) {
        this.StartLevel();
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
