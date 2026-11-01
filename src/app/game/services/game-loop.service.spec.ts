import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, expect, it } from 'vitest';

import { GameLoopService, GameLoopSteps } from './game-loop.service';

describe('GameLoopService', () => {
  let service: GameLoopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLoopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit GameLoopSteps when DoStep is called', () => {
    const received: GameLoopSteps[] = [];
    service.gameLoopState$.subscribe((step) => received.push(step));

    service.DoStep(GameLoopSteps.LockBoard);
    service.DoStep(GameLoopSteps.FindMatches);
    service.DoStep(GameLoopSteps.RemoveMatchSet);
    service.DoStep(GameLoopSteps.CompleteLoop);
    service.DoStep(GameLoopSteps.UnlockBoard);

    expect(received).toEqual([
      GameLoopSteps.LockBoard,
      GameLoopSteps.FindMatches,
      GameLoopSteps.RemoveMatchSet,
      GameLoopSteps.CompleteLoop,
      GameLoopSteps.UnlockBoard,
    ]);
  });
});
