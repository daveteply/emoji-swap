import { TestBed } from '@angular/core/testing';
import { AudioService } from 'src/app/services/audio.service';

import { TileRemoveService } from './tile-remove.service';

describe('TileRemoveService', () => {
  let service: TileRemoveService;
  let audioServiceStub: Partial<AudioService> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AudioService, useValue: audioServiceStub }],
    });
    service = TestBed.inject(TileRemoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
