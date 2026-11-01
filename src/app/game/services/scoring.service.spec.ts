import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ScoringService } from './scoring.service';
import { AudioService } from 'src/app/services/audio.service';
import { AudioType } from 'src/app/services/audio-data';
import { GameSplashService, SplashType } from './game-splash.service';
import { CASCADE_BONUS, HINT_REDUCTION } from '../../constants';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';

describe('ScoringService', () => {
  let service: ScoringService;
  let audioServiceSpy: { PlayAudio: ReturnType<typeof vi.fn> };
  let splashServiceSpy: { DoSplash: ReturnType<typeof vi.fn> };

  const createMockTile = (rowInx: number, colInx: number): GameTile => ({
    rowInx,
    colInx,
    code: '1',
    html: '😀',
    title: 'grin',
    score: { baseScore: 0 },
  });

  const createMockBoard = (): GameBoard => ({
    grid: [
      [createMockTile(0, 0), createMockTile(0, 1), createMockTile(0, 2), createMockTile(0, 3)],
      [createMockTile(1, 0), createMockTile(1, 1), createMockTile(1, 2), createMockTile(1, 3)],
    ],
  });

  beforeEach(() => {
    audioServiceSpy = { PlayAudio: vi.fn() };
    splashServiceSpy = { DoSplash: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        ScoringService,
        { provide: AudioService, useValue: audioServiceSpy },
        { provide: GameSplashService, useValue: splashServiceSpy },
      ],
    });
    service = TestBed.inject(ScoringService);
  });

  afterEach(() => {
    service.OnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate hint deduction and trigger HintLoss splash', () => {
    const deduction = service.ApplyHint(3);
    expect(deduction).toBe(3 * HINT_REDUCTION);
    expect(splashServiceSpy.DoSplash).toHaveBeenCalledWith({
      splashType: SplashType.HintLoss,
      scoreValue: 3 * HINT_REDUCTION,
    });
  });

  it('should calculate cascade bonus, trigger CascadeBonus splash, and play RareBonus audio', () => {
    const bonus = service.ApplyCascade(2, 3);
    expect(bonus).toBe(2 * 3 * CASCADE_BONUS);
    expect(splashServiceSpy.DoSplash).toHaveBeenCalledWith({
      splashType: SplashType.CascadeBonus,
      scoreValue: 2 * 3 * CASCADE_BONUS,
    });
    expect(audioServiceSpy.PlayAudio).toHaveBeenCalledWith(AudioType.RareBonus);
  });

  it('should apply base score and match length bonus for matches > 3 tiles', () => {
    const board = createMockBoard();
    const matchSet = [board.grid[0][0], board.grid[0][1], board.grid[0][2], board.grid[0][3]];

    service.ApplyScoring(board, matchSet, 2);

    expect(board.grid[0][0].score.baseScore).toBe(2);
    expect(board.grid[0][0].score.matchLengthBonus).toBe(8);
    expect(splashServiceSpy.DoSplash).toHaveBeenCalledWith({
      splashType: SplashType.MatchLengthBonus,
      scoreValue: 32,
    });
    expect(audioServiceSpy.PlayAudio).toHaveBeenCalledWith(AudioType.RareBonus);

    const total = service.TallyScore(board);
    expect(total).toBe(4 * (2 + 8));
  });

  it('should apply SuperTimeBonus when elapsed time is within TIME_SUPER_BONUS_CAP', () => {
    const board = createMockBoard();
    const matchSet = [board.grid[0][0], board.grid[0][1], board.grid[0][2]];

    (service as any).elapsed = 500;
    service.ApplyScoring(board, matchSet, 1);

    expect(board.grid[0][0].score.timeBonusSuper).toBeGreaterThan(0);
    expect(splashServiceSpy.DoSplash).toHaveBeenCalledWith(
      expect.objectContaining({ splashType: SplashType.SuperTimeBonus }),
    );
    expect(audioServiceSpy.PlayAudio).toHaveBeenCalledWith(AudioType.RareBonus);
  });

  it('should apply TimeBonus when elapsed time is between TIME_SUPER_BONUS_CAP and TIME_BONUS_CAP', () => {
    const board = createMockBoard();
    const matchSet = [board.grid[0][0], board.grid[0][1], board.grid[0][2]];

    (service as any).elapsed = 2000;
    service.ApplyScoring(board, matchSet, 1);

    expect(board.grid[0][0].score.timeBonus).toBeGreaterThan(0);
    expect(splashServiceSpy.DoSplash).toHaveBeenCalledWith(
      expect.objectContaining({ splashType: SplashType.TimeBonus }),
    );
    expect(audioServiceSpy.PlayAudio).toHaveBeenCalledWith(AudioType.TimeBonus);

    expect(service.TallyScore(board)).toBeGreaterThan(3);
  });

  it('should start, toggle, stop, and reset timer cleanly', () => {
    service.TimerStart();
    expect((service as any).isRunning).toBe(true);

    // Calling TimerStart again toggles running state off
    service.TimerStart();
    expect((service as any).isRunning).toBe(false);

    service.TimerStart();
    service.TimerReset();
    expect((service as any).isRunning).toBe(false);
    expect((service as any).elapsed).toBe(0);
  });
});
