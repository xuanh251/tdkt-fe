import { TestBed } from '@angular/core/testing';

import { DonviService } from './donvi.service';

describe('DonviService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonviService = TestBed.get(DonviService);
    expect(service).toBeTruthy();
  });
});
