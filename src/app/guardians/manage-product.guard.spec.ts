import { TestBed } from '@angular/core/testing';

import { ManageProductGuard } from './manage-product.guard';

describe('ManageProductGuard', () => {
  let guard: ManageProductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManageProductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
