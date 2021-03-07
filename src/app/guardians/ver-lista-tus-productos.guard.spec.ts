import { TestBed } from '@angular/core/testing';

import { VerListaTusProductosGuard } from './ver-lista-tus-productos.guard';

describe('VerListaTusProductosGuard', () => {
  let guard: VerListaTusProductosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerListaTusProductosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
