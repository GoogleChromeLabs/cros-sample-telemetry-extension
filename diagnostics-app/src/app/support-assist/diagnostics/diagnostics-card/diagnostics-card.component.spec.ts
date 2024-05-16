/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagnosticsCardComponent} from './diagnostics-card.component';

import {RoutineType} from 'common/telemetry-extension-types/legacy-diagnostics';

describe('DiagnosticsCardComponent', () => {
  let component: DiagnosticsCardComponent;
  let fixture: ComponentFixture<DiagnosticsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticsCardComponent],
    });
    fixture = TestBed.createComponent(DiagnosticsCardComponent);
    component = fixture.componentInstance;
    component.routine = RoutineType.ac_power;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
