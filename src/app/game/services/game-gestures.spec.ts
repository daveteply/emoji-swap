import { TestBed } from '@angular/core/testing';

import { GameGestures } from './game-gestures';

describe('GameGestures', () => {
  let service: GameGestures;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameGestures);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
