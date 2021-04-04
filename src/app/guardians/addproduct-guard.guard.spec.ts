import { TestBed } from '@angular/core/testing';

import { AddproductGuardGuard } from './addproduct-guard.guard';

describe('AddproductGuardGuard', () => {
  let guard: AddproductGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddproductGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
