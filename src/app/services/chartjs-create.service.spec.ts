import { TestBed } from '@angular/core/testing';

import { ChartjsCreateService } from './chartjs-create.service';

describe('ChartjsCreateService', () => {
  let service: ChartjsCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartjsCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
