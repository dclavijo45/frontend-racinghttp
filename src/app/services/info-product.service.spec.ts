import { TestBed } from '@angular/core/testing';

import { InfoProductService } from './info-product.service';

describe('InfoProductService', () => {
  let service: InfoProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
