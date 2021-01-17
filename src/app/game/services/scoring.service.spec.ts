import { TestBed } from '@angular/core/testing';

import { ScoringService } from './scoring.service';
import { AudioService } from 'src/app/services/audio.service';

describe('ScoringService', () => {
  let service: ScoringService;
  let audioServiceStub: Partial<AudioService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AudioService, useValue: audioServiceStub }],
    });
    service = TestBed.inject(ScoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
