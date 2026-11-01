import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioService } from 'src/app/services/audio.service';
import { AudioType } from 'src/app/services/audio-data';

import { TileRemoveService, TileRemoveSteps } from './tile-remove.service';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';

describe('TileRemoveService', () => {
  let service: TileRemoveService;
  let audioServiceSpy: { PlayAudio: ReturnType<typeof vi.fn> };
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
    audioServiceSpy = { PlayAudio: vi.fn() };
    TestBed.configureTestingModule({
      providers: [{ provide: AudioService, useValue: audioServiceSpy }],
    });
    service = TestBed.inject(TileRemoveService);

    mockBoard = {
      grid: [
        [createTile(0, 0, 'A0'), createTile(0, 1, 'B0')],
        [createTile(1, 0, 'A1'), createTile(1, 1, 'B1')],
        [createTile(2, 0, 'A2'), createTile(2, 1, 'B2')],
      ],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute the full tile removal state machine and shift column tiles down', () => {
    const steps: TileRemoveSteps[] = [];
    service.tileRemoveState$.subscribe((step) => steps.push(step));

    const targetTile = mockBoard.grid[2][0];
    service.StartTileDeletion([targetTile]);
    expect(steps).toEqual([TileRemoveSteps.SetToRemove]);

    service.SetToRemove(mockBoard);
    expect(mockBoard.grid[2][0].toRemove).toBe(true);
    expect(steps[steps.length - 1]).toBe(TileRemoveSteps.NextTile);

    const replacementTile = createTile(0, 0, 'NEW');
    service.NextTile(replacementTile);
    expect(steps[steps.length - 1]).toBe(TileRemoveSteps.ApplyRemoveClass);

    service.ApplyRemoveClass(mockBoard);
    expect(mockBoard.grid[2][0].animateRemove).toBe(true);
    expect(audioServiceSpy.PlayAudio).toHaveBeenCalledWith(AudioType.TileRemove, true);
    expect(steps[steps.length - 1]).toBe(TileRemoveSteps.ApplyDropClass);

    service.ApplyDropClass(mockBoard);
    expect(mockBoard.grid[1][0].animateSlideDown).toBe(true);
    expect(mockBoard.grid[0][0].animateSlideDown).toBe(true);
    expect(steps[steps.length - 1]).toBe(TileRemoveSteps.Shift);

    service.Shift(mockBoard);
    expect(mockBoard.grid[2][0].code).toBe('A1');
    expect(mockBoard.grid[1][0].code).toBe('A0');
    expect(mockBoard.grid[0][0].code).toBe('NEW');
    expect(steps[steps.length - 1]).toBe(TileRemoveSteps.NextTile);

    // Calling NextTile when queue is empty emits Complete
    service.NextTile(createTile(0, 0, 'UNUSED'));
    expect(steps[steps.length - 1]).toBe(TileRemoveSteps.Complete);
  });
});
