import {TestBed} from '@angular/core/testing';

import {TestOrchestratorService} from './test-orchestrator.service';

describe('TestOrchestratorService', () => {
  let service: TestOrchestratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestOrchestratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
