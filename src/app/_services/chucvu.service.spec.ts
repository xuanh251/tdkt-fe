import { TestBed } from '@angular/core/testing';

import { ChucvuService } from './chucvu.service';

describe('ChucvuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChucvuService = TestBed.get(ChucvuService);
    expect(service).toBeTruthy();
  });
});
