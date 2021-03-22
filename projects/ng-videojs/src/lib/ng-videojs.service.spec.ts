import { TestBed } from '@angular/core/testing';

import { NgVideojsService } from './ng-videojs.service';

describe('NgVideojsService', () => {
  let service: NgVideojsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgVideojsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
