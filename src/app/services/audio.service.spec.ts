import { TestBed } from '@angular/core/testing';

import { AudioService } from './audio.service';
import { AudioContext } from 'angular-audio-context';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AudioContext] });
    service = TestBed.inject(AudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
