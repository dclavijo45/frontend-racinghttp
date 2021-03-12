import { TestBed } from '@angular/core/testing';

import { UpdateProductGuard } from './update-product.guard';

describe('UpdateProductGuard', () => {
  let guard: UpdateProductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UpdateProductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
