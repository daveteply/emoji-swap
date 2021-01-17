import { TestBed } from '@angular/core/testing';

import { GameInteractionsService } from './game-interactions.service';
import { GameUtilityService } from './game-utility.service';
import { ScoringService } from './scoring.service';

describe('GameInteractionsService', () => {
  let service: GameInteractionsService;

  let gameUtilityServiceStub: Partial<GameUtilityService>;
  let scoringServiceStub: Partial<ScoringService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GameUtilityService, useValue: gameUtilityServiceStub },
        { provide: ScoringService, useValue: scoringServiceStub },
      ],
    });
    service = TestBed.inject(GameInteractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
