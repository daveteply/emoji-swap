import { TestBed } from '@angular/core/testing';

import { GameUtilityService } from './game-utility.service';

describe('GameUtilityService', () => {
  let service: GameUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
