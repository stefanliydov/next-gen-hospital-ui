import { TestBed } from '@angular/core/testing';

import { CookieWrapperService } from './cookie-wrapper.service';

describe('CookieWrapperService', () => {
  let service: CookieWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
