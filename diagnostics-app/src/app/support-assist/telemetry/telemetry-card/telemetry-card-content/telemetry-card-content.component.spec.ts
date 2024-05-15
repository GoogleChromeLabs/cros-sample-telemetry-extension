/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TelemetryCardContentComponent} from './telemetry-card-content.component';

describe('TelemetryCardContentComponent', () => {
  let component: TelemetryCardContentComponent;
  let fixture: ComponentFixture<TelemetryCardContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelemetryCardContentComponent],
    });
    fixture = TestBed.createComponent(TelemetryCardContentComponent);
    component = fixture.componentInstance;
    component.info = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
