import { TestBed } from '@angular/core/testing';

import { HinhThucKhenThuongService } from './hinh-thuc-khen-thuong.service';

describe('HinhThucKhenThuongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HinhThucKhenThuongService = TestBed.get(HinhThucKhenThuongService);
    expect(service).toBeTruthy();
  });
});
