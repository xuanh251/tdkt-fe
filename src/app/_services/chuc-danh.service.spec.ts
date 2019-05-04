import { TestBed } from '@angular/core/testing';

import { ChucDanhService } from './chuc-danh.service';

describe('ChucDanhService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChucDanhService = TestBed.get(ChucDanhService);
    expect(service).toBeTruthy();
  });
});
