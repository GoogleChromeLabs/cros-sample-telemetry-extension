// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview TelemetryModule defines module for the telemetry feature.
 * Imported by app.module.ts
 */

import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TelemetryCardContentComponent} from './telemetry-card/telemetry-card-content/telemetry-card-content.component';
import {TelemetryCardComponent} from './telemetry-card/telemetry-card.component';
import {TelemetryDashboardComponent} from './telemetry-dashboard/telemetry-dashboard.component';

@NgModule({
  declarations: [
    TelemetryCardComponent,
    TelemetryCardContentComponent,
    TelemetryDashboardComponent,
  ],
  imports: [CommonModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TelemetryModule {}
