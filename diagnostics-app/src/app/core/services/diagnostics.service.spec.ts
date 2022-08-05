// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for diagnostics.service
 */

import { TestBed } from '@angular/core/testing';

import { DiagnosticsService } from './diagnostics.service';

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
