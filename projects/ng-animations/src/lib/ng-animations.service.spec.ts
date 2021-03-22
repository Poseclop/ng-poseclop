import { TestBed } from '@angular/core/testing';

import { NgAnimationsService } from './ng-animations.service';

describe('NgAnimationsService', () => {
  let service: NgAnimationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAnimationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
