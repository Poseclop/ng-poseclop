import { TestBed } from '@angular/core/testing';

import { NgTypedFormService } from './ng-typed-form.service';

describe('NgTypedFormService', () => {
  let service: NgTypedFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTypedFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
