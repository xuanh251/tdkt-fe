/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NamHocService } from './nam-hoc.service';

describe('Service: NamHoc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NamHocService]
    });
  });

  it('should ...', inject([NamHocService], (service: NamHocService) => {
    expect(service).toBeTruthy();
  }));
});
