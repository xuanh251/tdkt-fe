import { TestBed } from '@angular/core/testing';

import { KhenThuongService } from './khen-thuong.service';

describe('KhenThuongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KhenThuongService = TestBed.get(KhenThuongService);
    expect(service).toBeTruthy();
  });
});
