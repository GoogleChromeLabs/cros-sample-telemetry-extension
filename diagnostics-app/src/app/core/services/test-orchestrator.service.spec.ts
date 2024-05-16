/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

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
