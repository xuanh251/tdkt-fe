import { TestBed } from '@angular/core/testing';

import { BauChonService } from './bau-chon.service';

describe('BauChonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BauChonService = TestBed.get(BauChonService);
    expect(service).toBeTruthy();
  });
});
