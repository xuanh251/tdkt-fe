import { TestBed } from '@angular/core/testing';

import { CanboService } from './canbo.service';

describe('CanboService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanboService = TestBed.get(CanboService);
    expect(service).toBeTruthy();
  });
});
