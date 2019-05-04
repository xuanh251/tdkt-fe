import { TestBed } from '@angular/core/testing';

import { DanhHieuThiDuaService } from './danh-hieu-thi-dua.service';

describe('DanhHieuThiDuaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DanhHieuThiDuaService = TestBed.get(DanhHieuThiDuaService);
    expect(service).toBeTruthy();
  });
});
