/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines tests for dashboard.component.ts
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TelemetryDashboardComponent} from './telemetry-dashboard.component';

describe('TelemetryDashboardComponent', () => {
  let component: TelemetryDashboardComponent;
  let fixture: ComponentFixture<TelemetryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelemetryDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemetryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
