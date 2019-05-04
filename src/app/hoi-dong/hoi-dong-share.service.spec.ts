import { TestBed } from '@angular/core/testing';

import { HoiDongShareService } from './hoi-dong-share.service';

describe('HoiDongShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoiDongShareService = TestBed.get(HoiDongShareService);
    expect(service).toBeTruthy();
  });
});
