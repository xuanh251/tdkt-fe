/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HoiDongService } from './hoi-dong.service';

describe('Service: HoiDong', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoiDongService]
    });
  });

  it('should ...', inject([HoiDongService], (service: HoiDongService) => {
    expect(service).toBeTruthy();
  }));
});
