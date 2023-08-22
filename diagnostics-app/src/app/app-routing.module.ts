// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines routes for app.module
 * Imported by app.module.ts
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './telemetry/dashboard/dashboard.component';
import { BatteryComponent } from './diagnostics/battery/battery.component';

const routes: Routes = [
  { path: '', redirectTo: '/telemetry', pathMatch: 'full' },
  { path: 'telemetry', component: DashboardComponent },
  { path: 'diagnostics/battery', component: BatteryComponent },
  { path: '**', redirectTo: '/telemetry' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
