import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { of, Subject } from 'rxjs';
import { MATCH_SET_COUNT_NEXT_LEVEL } from 'src/app/constants';
import { AudioType } from 'src/app/services/audio-data';
import { AudioService } from 'src/app/services/audio.service';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GameTile } from '../../models/game-tile';
import { GameInteractionsService, InteractionSteps } from '../../services/game-interactions.service';
import { GameLoopService, GameLoopSteps } from '../../services/game-loop.service';
import { GameSplashService, SplashType } from '../../services/game-splash.service';
import { GameService } from '../../services/game.service';
import { ScoringService } from '../../services/scoring.service';
import { TileRemoveService, TileRemoveSteps } from '../../services/tile-remove.service';
import { GameBoardTileComponent } from '../game-board-tile/game-board-tile.component';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  let gameLoopSubject: Subject<GameLoopSteps>;
  let tileRemoveSubject: Subject<TileRemoveSteps>;
  let gameInteractionSubject: Subject<InteractionSteps>;

  let gameServiceStub: {
    CreateGame: ReturnType<typeof vi.fn>;
    FindMatchesAndPotentials: ReturnType<typeof vi.fn>;
    ReIndexGrid: ReturnType<typeof vi.fn>;
    NewTile: ReturnType<typeof vi.fn>;
    currentMatchSets: GameTile[][];
    currentPotentialMatches: GameTile[][];
  };
  let gameLoopServiceStub: {
    gameLoopState$: ReturnType<Subject<GameLoopSteps>['asObservable']>;
    DoStep: ReturnType<typeof vi.fn>;
  };
  let tileRemoveServiceStub: {
    tileRemoveState$: ReturnType<Subject<TileRemoveSteps>['asObservable']>;
    StartTileDeletion: ReturnType<typeof vi.fn>;
    SetToRemove: ReturnType<typeof vi.fn>;
    NextTile: ReturnType<typeof vi.fn>;
    ApplyRemoveClass: ReturnType<typeof vi.fn>;
    ApplyDropClass: ReturnType<typeof vi.fn>;
    Shift: ReturnType<typeof vi.fn>;
  };
  let gameInteractionsServiceStub: {
    gameInteractionState$: ReturnType<Subject<InteractionSteps>['asObservable']>;
    registerGestureElement: ReturnType<typeof vi.fn>;
    DoStep: ReturnType<typeof vi.fn>;
    LocateAdjacentTile: ReturnType<typeof vi.fn>;
    SetDirectionalAnimationClass: ReturnType<typeof vi.fn>;
    Swap: ReturnType<typeof vi.fn>;
    SwapBack: ReturnType<typeof vi.fn>;
    Shutter: ReturnType<typeof vi.fn>;
    ApplyPotentials: ReturnType<typeof vi.fn>;
  };
  let scoringServiceStub: {
    TimerReset: ReturnType<typeof vi.fn>;
    TimerStart: ReturnType<typeof vi.fn>;
    ApplyHint: ReturnType<typeof vi.fn>;
    ApplyScoring: ReturnType<typeof vi.fn>;
    TallyScore: ReturnType<typeof vi.fn>;
    ApplyCascade: ReturnType<typeof vi.fn>;
  };
  let audioServiceStub: {
    PlayAudio: ReturnType<typeof vi.fn>;
    SetMinNote: ReturnType<typeof vi.fn>;
  };
  let gameSplashServiceStub: {
    DoSplash: ReturnType<typeof vi.fn>;
  };

  const sampleTile: GameTile = {
    rowInx: 0,
    colInx: 0,
    code: 'A',
    html: '😀',
    title: 'grinning face',
    score: { baseScore: 3 },
  };

  beforeEach(async () => {
    vi.useFakeTimers();

    gameLoopSubject = new Subject<GameLoopSteps>();
    tileRemoveSubject = new Subject<TileRemoveSteps>();
    gameInteractionSubject = new Subject<InteractionSteps>();

    gameServiceStub = {
      CreateGame: vi.fn().mockReturnValue({ grid: [[sampleTile]] }),
      FindMatchesAndPotentials: vi.fn(),
      ReIndexGrid: vi.fn(),
      NewTile: vi.fn().mockReturnValue(sampleTile),
      currentMatchSets: [],
      currentPotentialMatches: [[sampleTile]],
    };
    gameLoopServiceStub = {
      gameLoopState$: gameLoopSubject.asObservable(),
      DoStep: vi.fn(),
    };
    tileRemoveServiceStub = {
      tileRemoveState$: tileRemoveSubject.asObservable(),
      StartTileDeletion: vi.fn(),
      SetToRemove: vi.fn(),
      NextTile: vi.fn(),
      ApplyRemoveClass: vi.fn(),
      ApplyDropClass: vi.fn(),
      Shift: vi.fn(),
    };
    gameInteractionsServiceStub = {
      gameInteractionState$: gameInteractionSubject.asObservable(),
      registerGestureElement: vi.fn(),
      DoStep: vi.fn(),
      LocateAdjacentTile: vi.fn().mockReturnValue(true),
      SetDirectionalAnimationClass: vi.fn(),
      Swap: vi.fn(),
      SwapBack: vi.fn(),
      Shutter: vi.fn(),
      ApplyPotentials: vi.fn(),
    };
    scoringServiceStub = {
      TimerReset: vi.fn(),
      TimerStart: vi.fn(),
      ApplyHint: vi.fn().mockReturnValue(9),
      ApplyScoring: vi.fn(),
      TallyScore: vi.fn().mockReturnValue(12),
      ApplyCascade: vi.fn().mockReturnValue(6),
    };
    audioServiceStub = {
      PlayAudio: vi.fn().mockResolvedValue(undefined),
      SetMinNote: vi.fn(),
    };
    gameSplashServiceStub = {
      DoSplash: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        GameBoardComponent,
        GameBoardTileComponent,
        MatProgressBarModule,
        MatDialogModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: GameService, useValue: gameServiceStub },
        { provide: GameLoopService, useValue: gameLoopServiceStub },
        { provide: TileRemoveService, useValue: tileRemoveServiceStub },
        { provide: GameInteractionsService, useValue: gameInteractionsServiceStub },
        { provide: ScoringService, useValue: scoringServiceStub },
        { provide: AudioService, useValue: audioServiceStub },
        { provide: GameSplashService, useValue: gameSplashServiceStub },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    vi.advanceTimersByTime(800);
  });

  it('should create and start level 1 on init', () => {
    expect(component).toBeTruthy();
    expect(gameServiceStub.CreateGame).toHaveBeenCalled();
    expect(audioServiceStub.PlayAudio).toHaveBeenCalledWith(AudioType.LevelChange);
    expect(gameLoopServiceStub.DoStep).toHaveBeenCalledWith(GameLoopSteps.LockBoard);
  });

  it('should deduct hint penalty and trigger ShowHint on UseHint()', () => {
    const scoreSpy = vi.fn();
    component.scoreUpdated.subscribe(scoreSpy);

    component.UseHint();

    expect(component.hintDisabled).toBe(true);
    expect(gameInteractionsServiceStub.DoStep).toHaveBeenCalledWith(InteractionSteps.ShowHint);
    expect(scoringServiceStub.ApplyHint).toHaveBeenCalledWith(1);
    expect(scoreSpy).toHaveBeenCalledWith(-9);
  });

  it('should process GameLoopSteps.LockBoard and FindMatches', () => {
    gameLoopServiceStub.DoStep.mockClear();
    gameLoopSubject.next(GameLoopSteps.LockBoard);
    vi.advanceTimersByTime(60);

    expect(component.boardDisabled).toBe(true);
    expect(gameLoopServiceStub.DoStep).toHaveBeenCalledWith(GameLoopSteps.FindMatches);

    gameLoopServiceStub.DoStep.mockClear();
    gameLoopSubject.next(GameLoopSteps.FindMatches);
    vi.advanceTimersByTime(60);

    expect(gameServiceStub.FindMatchesAndPotentials).toHaveBeenCalled();
    expect(gameLoopServiceStub.DoStep).toHaveBeenCalledWith(GameLoopSteps.RemoveMatchSet);
  });

  it('should start tile deletion when RemoveMatchSet has matches', () => {
    gameServiceStub.currentMatchSets = [[sampleTile]];
    gameLoopSubject.next(GameLoopSteps.FindMatches);
    vi.advanceTimersByTime(60);

    gameLoopSubject.next(GameLoopSteps.RemoveMatchSet);
    vi.advanceTimersByTime(60);

    expect(audioServiceStub.PlayAudio).toHaveBeenCalledWith(AudioType.MatchFound);
    expect(tileRemoveServiceStub.StartTileDeletion).toHaveBeenCalled();
    expect(component.hintDisabled).toBe(false);
  });

  it('should unlock board, start timer, and reset notes when RemoveMatchSet has no matches but has potentials', () => {
    gameServiceStub.currentMatchSets = [];
    gameServiceStub.currentPotentialMatches = [[sampleTile]];
    gameLoopSubject.next(GameLoopSteps.FindMatches);
    vi.advanceTimersByTime(60);

    gameLoopServiceStub.DoStep.mockClear();
    gameLoopSubject.next(GameLoopSteps.RemoveMatchSet);
    vi.advanceTimersByTime(60);

    expect(gameLoopServiceStub.DoStep).toHaveBeenCalledWith(GameLoopSteps.UnlockBoard);
    expect(scoringServiceStub.TimerStart).toHaveBeenCalled();
    expect(audioServiceStub.SetMinNote).toHaveBeenCalled();

    gameLoopSubject.next(GameLoopSteps.UnlockBoard);
    vi.advanceTimersByTime(60);
    expect(component.boardDisabled).toBe(false);
  });

  it('should open GameOver dialog when RemoveMatchSet has neither matches nor potentials', () => {
    const dialog = (component as unknown as { dialog: MatDialog }).dialog;
    const router = (component as unknown as { router: Router }).router;
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const openSpy = vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<unknown>);

    gameServiceStub.currentMatchSets = [];
    gameServiceStub.currentPotentialMatches = [];
    gameLoopSubject.next(GameLoopSteps.FindMatches);
    vi.advanceTimersByTime(60);

    gameLoopSubject.next(GameLoopSteps.RemoveMatchSet);
    vi.advanceTimersByTime(60);

    expect(openSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should advance to next level on CompleteLoop when matchSetCount reaches threshold', () => {
    const levelSpy = vi.fn();
    component.levelUpdated.subscribe(levelSpy);

    // Simulate reaching MATCH_SET_COUNT_NEXT_LEVEL matches
    (component as unknown as { matchSetCount: number }).matchSetCount = MATCH_SET_COUNT_NEXT_LEVEL;
    (component as unknown as { cascadeCount: number }).cascadeCount = 2;

    gameLoopSubject.next(GameLoopSteps.CompleteLoop);
    vi.advanceTimersByTime(850);

    expect(scoringServiceStub.ApplyCascade).toHaveBeenCalled();
    expect(gameSplashServiceStub.DoSplash).toHaveBeenCalledWith({ splashType: SplashType.LevelComplete });
    expect(levelSpy).toHaveBeenCalledWith(2);
  });

  it('should handle all TileRemoveSteps transitions', () => {
    tileRemoveSubject.next(TileRemoveSteps.SetToRemove);
    vi.advanceTimersByTime(110);
    expect(tileRemoveServiceStub.SetToRemove).toHaveBeenCalled();

    tileRemoveSubject.next(TileRemoveSteps.NextTile);
    vi.advanceTimersByTime(110);
    expect(gameServiceStub.ReIndexGrid).toHaveBeenCalled();
    expect(tileRemoveServiceStub.NextTile).toHaveBeenCalled();

    tileRemoveSubject.next(TileRemoveSteps.ApplyRemoveClass);
    vi.advanceTimersByTime(110);
    expect(tileRemoveServiceStub.ApplyRemoveClass).toHaveBeenCalled();

    tileRemoveSubject.next(TileRemoveSteps.ApplyDropClass);
    vi.advanceTimersByTime(110);
    expect(tileRemoveServiceStub.ApplyDropClass).toHaveBeenCalled();

    tileRemoveSubject.next(TileRemoveSteps.Shift);
    vi.advanceTimersByTime(110);
    expect(tileRemoveServiceStub.Shift).toHaveBeenCalled();

    gameLoopServiceStub.DoStep.mockClear();
    tileRemoveSubject.next(TileRemoveSteps.Complete);
    vi.advanceTimersByTime(110);
    expect(gameLoopServiceStub.DoStep).toHaveBeenCalledWith(GameLoopSteps.CompleteLoop);
  });

  it('should handle all InteractionSteps transitions', () => {
    gameInteractionSubject.next(InteractionSteps.LocateAdjacentTile);
    vi.advanceTimersByTime(110);
    expect(gameInteractionsServiceStub.LocateAdjacentTile).toHaveBeenCalled();
    expect(audioServiceStub.PlayAudio).toHaveBeenCalledWith(AudioType.Swipe);
    expect(gameInteractionsServiceStub.DoStep).toHaveBeenCalledWith(InteractionSteps.ApplyDirectionalAnimation);

    gameInteractionSubject.next(InteractionSteps.ApplyDirectionalAnimation);
    vi.advanceTimersByTime(110);
    expect(gameInteractionsServiceStub.SetDirectionalAnimationClass).toHaveBeenCalled();

    gameLoopServiceStub.DoStep.mockClear();
    gameInteractionSubject.next(InteractionSteps.Swap);
    vi.advanceTimersByTime(110);
    expect(gameInteractionsServiceStub.Swap).toHaveBeenCalled();
    expect(gameServiceStub.ReIndexGrid).toHaveBeenCalled();
    expect(gameLoopServiceStub.DoStep).toHaveBeenCalledWith(GameLoopSteps.LockBoard);

    gameInteractionSubject.next(InteractionSteps.SwapBack);
    vi.advanceTimersByTime(110);
    expect(gameInteractionsServiceStub.SwapBack).toHaveBeenCalled();

    gameInteractionSubject.next(InteractionSteps.Shutter);
    vi.advanceTimersByTime(110);
    expect(gameInteractionsServiceStub.Shutter).toHaveBeenCalled();
    expect(audioServiceStub.PlayAudio).toHaveBeenCalledWith(AudioType.InvalidSwipe);

    gameInteractionSubject.next(InteractionSteps.ShowHint);
    vi.advanceTimersByTime(110);
    expect(audioServiceStub.PlayAudio).toHaveBeenCalledWith(AudioType.Hint);
    expect(gameInteractionsServiceStub.ApplyPotentials).toHaveBeenCalled();
  });
});
