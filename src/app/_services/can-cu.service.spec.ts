/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanCuService } from './can-cu.service';

describe('Service: CanCu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanCuService]
    });
  });

  it('should ...', inject([CanCuService], (service: CanCuService) => {
    expect(service).toBeTruthy();
  }));
});
