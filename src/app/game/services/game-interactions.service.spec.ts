import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  GameInteractionsService,
  InteractionSteps,
  PlayerSwipeDirection,
} from './game-interactions.service';
import { GameUtilityService } from './game-utility.service';
import { ScoringService } from './scoring.service';
import { GameGestures, IPanEvent, SwipeDirection } from './game-gestures';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';

describe('GameInteractionsService', () => {
  let service: GameInteractionsService;
  let scoringServiceSpy: { TimerStop: ReturnType<typeof vi.fn> };
  let panSubject: Subject<IPanEvent>;
  let gesturesStub: { registerElement: ReturnType<typeof vi.fn>; pan$: any };
  let mockBoard: GameBoard;

  const createTile = (rowInx: number, colInx: number, code: string): GameTile => ({
    rowInx,
    colInx,
    code,
    html: code,
    title: code,
    score: { baseScore: 0 },
  });

  beforeEach(() => {
    scoringServiceSpy = { TimerStop: vi.fn() };
    panSubject = new Subject<IPanEvent>();
    gesturesStub = {
      registerElement: vi.fn(),
      pan$: panSubject.asObservable(),
    };

    TestBed.configureTestingModule({
      providers: [
        GameInteractionsService,
        GameUtilityService,
        { provide: ScoringService, useValue: scoringServiceSpy },
        { provide: GameGestures, useValue: gesturesStub },
      ],
    });
    service = TestBed.inject(GameInteractionsService);

    mockBoard = {
      grid: [
        [createTile(0, 0, 'A'), createTile(0, 1, 'B'), createTile(0, 2, 'C')],
        [createTile(1, 0, 'D'), createTile(1, 1, 'E'), createTile(1, 2, 'F')],
        [createTile(2, 0, 'G'), createTile(2, 1, 'H'), createTile(2, 2, 'I')],
      ],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle gesture pan start, continuation, and end for a registered element', () => {
    const element = document.createElement('div');
    const tile = mockBoard.grid[1][1];
    const steps: InteractionSteps[] = [];
    service.gameInteractionState$.subscribe((s) => steps.push(s));

    service.registerGestureElement(element, tile);
    expect(gesturesStub.registerElement).toHaveBeenCalledWith(element);

    // Pan start
    panSubject.next({
      direction: SwipeDirection.Right,
      deltaX: 20,
      deltaY: 0,
      isFinal: false,
      element,
    });
    expect(steps).toEqual([InteractionSteps.LocateAdjacentTile]);
    expect(scoringServiceSpy.TimerStop).toHaveBeenCalled();

    // Pan continue updates direction without re-emitting TileSwiped
    panSubject.next({
      direction: SwipeDirection.Down,
      deltaX: 20,
      deltaY: 40,
      isFinal: false,
      element,
    });
    expect(steps.length).toBe(1);

    // Pan end resets isPanning
    panSubject.next({
      direction: SwipeDirection.Down,
      deltaX: 20,
      deltaY: 40,
      isFinal: true,
      element,
    });
    expect((service as any).isPanning).toBe(false);
  });

  it('should locate adjacent tiles in all 4 directions and apply directional animations + swap', () => {
    const directions = [
      { dir: PlayerSwipeDirection.Up, expectedCode: 'B' },
      { dir: PlayerSwipeDirection.Right, expectedCode: 'F' },
      { dir: PlayerSwipeDirection.Down, expectedCode: 'H' },
      { dir: PlayerSwipeDirection.Left, expectedCode: 'D' },
    ];

    for (const { dir, expectedCode } of directions) {
      const board: GameBoard = {
        grid: mockBoard.grid.map((row) => row.map((t) => ({ ...t }))),
      };
      service.TileSwiped({ tile: board.grid[1][1], direction: dir });
      expect(service.LocateAdjacentTile(board)).toBe(true);
      service.SetDirectionalAnimationClass(board);
      service.Swap(board);
      expect(board.grid[1][1].code).toBe(expectedCode);
    }
  });

  it('should emit Shutter and return false when swiping out of bounds', () => {
    const steps: InteractionSteps[] = [];
    service.gameInteractionState$.subscribe((s) => steps.push(s));

    service.TileSwiped({ tile: mockBoard.grid[0][0], direction: PlayerSwipeDirection.Up });
    expect(service.LocateAdjacentTile(mockBoard)).toBe(false);
    expect(steps[steps.length - 1]).toBe(InteractionSteps.Shutter);

    service.Shutter(mockBoard);
    expect(mockBoard.grid[0][0].animateShutter).toBe(true);
  });

  it('should toggle SwapBack and emit LocateAdjacentTile on first SwapBack call', () => {
    const steps: InteractionSteps[] = [];
    service.gameInteractionState$.subscribe((s) => steps.push(s));

    service.SwapBack();
    expect(steps).toEqual([InteractionSteps.LocateAdjacentTile]);

    service.SwapBack();
    expect(steps.length).toBe(1);
  });

  it('should apply potential class to all or a random potential match set', () => {
    const potentials = [
      [mockBoard.grid[0][0], mockBoard.grid[0][1]],
      [mockBoard.grid[2][0], mockBoard.grid[2][1]],
    ];

    service.ApplyPotentials(mockBoard, potentials, true);
    const randomMarked = mockBoard.grid.flat().filter((t) => t.potential);
    expect(randomMarked.length).toBe(2);

    // Reset and test random = false
    mockBoard.grid.flat().forEach((t) => (t.potential = false));
    service.ApplyPotentials(mockBoard, potentials, false);
    const allMarked = mockBoard.grid.flat().filter((t) => t.potential);
    expect(allMarked.length).toBe(4);
  });
});
