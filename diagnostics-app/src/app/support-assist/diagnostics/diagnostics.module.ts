/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview DiagnosticsModule defines module for the diagnostics components.
 * Imported by app.module.ts
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {DiagnosticsCardComponent} from './diagnostics-card/diagnostics-card.component';
import {DiagnosticsDashboardComponent} from './diagnostics-dashboard/diagnostics-dashboard.component';

@NgModule({
  declarations: [DiagnosticsCardComponent, DiagnosticsDashboardComponent],
  imports: [CommonModule, SharedModule],
})
export class DiagnosticsModule {}
