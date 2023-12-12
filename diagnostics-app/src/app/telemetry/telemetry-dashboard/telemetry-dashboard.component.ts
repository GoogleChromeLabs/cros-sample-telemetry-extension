// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Dashboard Component in Telemetry.
 * This is the root layout component which holds the telemetry dashboard.
 * Imported by telemetry.module.ts
 */

import {Component} from '@angular/core';
import {VISIBLE_TELEMETRY_CARDS} from 'common/config';
import {TelemetryInfoType} from 'common/message';

@Component({
  selector: 'app-telemetry-dashboard',
  templateUrl: './telemetry-dashboard.component.html',
  styleUrls: ['./telemetry-dashboard.component.css'],
})
export class TelemetryDashboardComponent {
  // Array of telemetry info types that will be displayed
  private _visibleTypes: TelemetryInfoType[] = VISIBLE_TELEMETRY_CARDS;

  get visibleTypes() {
    return this._visibleTypes;
  }
}
