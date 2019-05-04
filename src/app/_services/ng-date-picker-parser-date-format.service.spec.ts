import { TestBed } from '@angular/core/testing';

import { NgDatePickerParserDateFormatService } from './ng-date-picker-parser-date-format.service';

describe('NgDatePickerParserDateFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgDatePickerParserDateFormatService = TestBed.get(NgDatePickerParserDateFormatService);
    expect(service).toBeTruthy();
  });
});
