/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

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
