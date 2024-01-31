import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {DiagnosticsModule} from './diagnostics/diagnostics.module';
import {EventsModule} from './events/events.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {HeaderComponent} from './layout/header/header.component';
import {SideNavComponent} from './layout/side-nav/side-nav.component';
import {RoutineV2Module} from './routine-v2/routine-v2.module';
import {SupportAssistRoutingModule} from './support-assist-routing.module';
import {TelemetryModule} from './telemetry/telemetry.module';

@NgModule({
  declarations: [ContentLayoutComponent, HeaderComponent, SideNavComponent],
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
