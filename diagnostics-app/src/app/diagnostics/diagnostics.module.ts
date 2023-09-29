// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview DiagnosticsModule defines module for the diagnostics components.
 * Imported by app.module.ts
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticsDashboardComponent } from './diagnostics-dashboard/diagnostics-dashboard.component';
import { DiagnosticsCardComponent } from './diagnostics-card/diagnostics-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DiagnosticsCardComponent, DiagnosticsDashboardComponent],
  imports: [CommonModule, SharedModule],
})
export class DiagnosticsModule {}
