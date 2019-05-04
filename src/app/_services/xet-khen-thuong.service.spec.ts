import { TestBed } from '@angular/core/testing';

import { XetKhenThuongService } from './xet-khen-thuong.service';

describe('XetKhenThuongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XetKhenThuongService = TestBed.get(XetKhenThuongService);
    expect(service).toBeTruthy();
  });
});
