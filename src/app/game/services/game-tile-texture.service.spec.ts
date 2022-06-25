import { TestBed } from '@angular/core/testing';

import { GameTileTextureService } from './game-tile-texture.service';

describe('GameTileTextureService', () => {
  let service: GameTileTextureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTileTextureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
