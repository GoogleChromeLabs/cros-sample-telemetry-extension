/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiagnosticsDashboardComponent} from './diagnostics/diagnostics-dashboard/diagnostics-dashboard.component';
import {EventsDashboardComponent} from './events/events-dashboard/events-dashboard.component';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {RoutineV2DashboardComponent} from './routine-v2/routine-v2-dashboard/routine-v2-dashboard.component';
import {TelemetryDashboardComponent} from './telemetry/telemetry-dashboard/telemetry-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    pathMatch: 'prefix',
    children: [
      {path: '', redirectTo: 'telemetry', pathMatch: 'full'},
      {path: 'telemetry', component: TelemetryDashboardComponent},
      {path: 'diagnostics', component: DiagnosticsDashboardComponent},
      {path: 'events', component: EventsDashboardComponent},
      {path: 'routine-v2', component: RoutineV2DashboardComponent},
      {path: '**', redirectTo: 'telemetry'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportAssistRoutingModule {}
