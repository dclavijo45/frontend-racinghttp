import { TestBed } from '@angular/core/testing';

import { InfoProductGuard } from './info-product.guard';

describe('InfoProductGuard', () => {
  let guard: InfoProductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InfoProductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
