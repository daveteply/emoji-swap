import { TestBed } from '@angular/core/testing';

import { GameSplashService } from './game-splash.service';

describe('GameSplashService', () => {
  let service: GameSplashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSplashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
