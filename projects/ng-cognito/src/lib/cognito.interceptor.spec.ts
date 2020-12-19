import { TestBed } from '@angular/core/testing';

import { CognitoInterceptor } from './cognito.interceptor';

describe('CognitoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CognitoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CognitoInterceptor = TestBed.inject(CognitoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
