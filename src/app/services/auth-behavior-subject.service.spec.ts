import { TestBed } from '@angular/core/testing';

import { AuthBehaviorSubjectService } from './auth-behavior-subject.service';

describe('AuthBehaviorSubjectService', () => {
  let service: AuthBehaviorSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthBehaviorSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
