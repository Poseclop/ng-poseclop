import { TestBed } from '@angular/core/testing';

import { NonLoggedGuard } from './non-logged.guard';

describe('NonLoggedGuard', () => {
  let guard: NonLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
