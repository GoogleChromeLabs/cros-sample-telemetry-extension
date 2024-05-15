/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoutineType} from 'common/telemetry-extension-types/legacy-diagnostics';
import {RoutineV1TestComponent} from './routine-v1-test.component';

describe('RoutineV1TestComponent', () => {
  let component: RoutineV1TestComponent;
  let fixture: ComponentFixture<RoutineV1TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineV1TestComponent],
    });
    fixture = TestBed.createComponent(RoutineV1TestComponent);
    component = fixture.componentInstance;
    component.index = 0;
    component.title = 'test';
    component.argument = {category: RoutineType.cpu_cache, argument: {}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
