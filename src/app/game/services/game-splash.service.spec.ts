import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, expect, it } from 'vitest';

import { GameSplash, GameSplashService, SplashType } from './game-splash.service';

describe('GameSplashService', () => {
  let service: GameSplashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSplashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit GameSplash payloads on gameSplashState$ when DoSplash is called', () => {
    const emissions: GameSplash[] = [];
    service.gameSplashState$.subscribe((splash) => emissions.push(splash));

    service.DoSplash({ splashType: SplashType.TimeBonus, scoreValue: 100 });
    service.DoSplash({ splashType: SplashType.LevelComplete });

    expect(emissions).toEqual([
      { splashType: SplashType.TimeBonus, scoreValue: 100 },
      { splashType: SplashType.LevelComplete },
    ]);
  });
});
