import { TestBed } from '@angular/core/testing';

import { XetThiDuaService } from './xet-thi-dua.service';

describe('XetThiDuaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XetThiDuaService = TestBed.get(XetThiDuaService);
    expect(service).toBeTruthy();
  });
});
