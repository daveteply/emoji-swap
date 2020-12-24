import { TestBed } from '@angular/core/testing';

import { TileRemoveService } from './tile-remove.service';

describe('TileRemoveService', () => {
  let service: TileRemoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileRemoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
