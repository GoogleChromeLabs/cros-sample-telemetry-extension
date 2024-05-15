/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TelemetryInfoType} from 'common/message';
import {TelemetryCardComponent} from './telemetry-card.component';

describe('TelemetryCardComponent', () => {
  let component: TelemetryCardComponent;
  let fixture: ComponentFixture<TelemetryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelemetryCardComponent],
    });
    fixture = TestBed.createComponent(TelemetryCardComponent);
    component = fixture.componentInstance;
    component.type = TelemetryInfoType.BATTERY;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
