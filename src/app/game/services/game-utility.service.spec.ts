import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, expect, it } from 'vitest';

import { GameUtilityService } from './game-utility.service';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';

describe('GameUtilityService', () => {
  let service: GameUtilityService;
  let mockBoard: GameBoard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUtilityService);

    const tile = {} as GameTile;
    mockBoard = {
      grid: [
        [tile, tile, tile],
        [tile, tile, tile],
      ],
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for coordinates within grid bounds', () => {
    expect(service.WithinGrid(0, 0, mockBoard)).toBe(true);
    expect(service.WithinGrid(1, 2, mockBoard)).toBe(true);
  });

  it('should return false for negative row or column indices', () => {
    expect(service.WithinGrid(-1, 0, mockBoard)).toBe(false);
    expect(service.WithinGrid(0, -1, mockBoard)).toBe(false);
    expect(service.WithinGrid(-1, -1, mockBoard)).toBe(false);
  });

  it('should return false for indices equal to or exceeding grid dimensions', () => {
    expect(service.WithinGrid(2, 0, mockBoard)).toBe(false);
    expect(service.WithinGrid(0, 3, mockBoard)).toBe(false);
    expect(service.WithinGrid(5, 5, mockBoard)).toBe(false);
  });

  it('should return false when gameBoard or grid is empty', () => {
    expect(service.WithinGrid(0, 0, { grid: [] })).toBe(false);
  });
});
