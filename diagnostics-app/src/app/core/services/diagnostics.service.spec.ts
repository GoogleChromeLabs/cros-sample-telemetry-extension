/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Unit tests for diagnostics.service
 */

import {TestBed} from '@angular/core/testing';

import {DiagnosticsService} from './diagnostics.service';

describe('DiagnosticsService', () => {
  let service: DiagnosticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
