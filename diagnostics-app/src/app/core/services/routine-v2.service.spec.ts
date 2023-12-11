import {TestBed} from '@angular/core/testing';

import {RoutineV2Service} from './routine-v2.service';

describe('RoutineV2Service', () => {
  let service: RoutineV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
