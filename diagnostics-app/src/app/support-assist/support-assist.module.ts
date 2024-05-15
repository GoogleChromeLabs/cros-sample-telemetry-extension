/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {DiagnosticsModule} from './diagnostics/diagnostics.module';
import {EventsModule} from './events/events.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {SideNavComponent} from './layout/side-nav/side-nav.component';
import {RoutineV2Module} from './routine-v2/routine-v2.module';
import {SupportAssistRoutingModule} from './support-assist-routing.module';
import {TelemetryModule} from './telemetry/telemetry.module';

@NgModule({
  declarations: [ContentLayoutComponent, SideNavComponent],
  imports: [
    DiagnosticsModule,
    EventsModule,
    RoutineV2Module,
    TelemetryModule,
    SupportAssistRoutingModule,
    SharedModule,
  ],
  exports: [ContentLayoutComponent],
})
export class SupportAssistModule {}
