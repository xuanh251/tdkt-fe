import { TestBed } from '@angular/core/testing';

import { ThiDuaService } from './thi-dua.service';

describe('ThiDuaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThiDuaService = TestBed.get(ThiDuaService);
    expect(service).toBeTruthy();
  });
});
