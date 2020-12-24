import { TestBed } from '@angular/core/testing';

import { GameInteractionsService } from './game-interactions.service';

describe('GameInteractionsService', () => {
  let service: GameInteractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameInteractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
