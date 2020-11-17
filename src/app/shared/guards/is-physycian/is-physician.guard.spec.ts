import { TestBed } from '@angular/core/testing';

import { IsPhysicianGuard } from './is-physician.guard';

describe('IsPhysicianGuard', () => {
  let guard: IsPhysicianGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsPhysicianGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
