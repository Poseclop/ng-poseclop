import { TestBed } from '@angular/core/testing';

import { NgLoggerServiceService } from './ng-logger-service.service';

describe('NgLoggerServiceService', () => {
  let service: NgLoggerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgLoggerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
