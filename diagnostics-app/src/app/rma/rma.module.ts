import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {TestOrchestratorService} from 'app/core/services/test-orchestrator.service';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {RmaRoutingModule} from './rma-routing.module';
import {RmaSidebarComponent} from './rma-sidebar/rma-sidebar.component';
import {AuditPageComponent} from './test-viewer/audit-page/audit-page.component';
import {JsonViewerComponent} from './test-viewer/json-viewer/json-viewer.component';
import {RoutineV1TestComponent} from './test-viewer/routine-v1-test/routine-v1-test.component';
import {RoutineV2TestComponent} from './test-viewer/routine-v2-test/routine-v2-test.component';
import {TestViewerComponent} from './test-viewer/test-viewer.component';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    LogViewerComponent,
    RmaSidebarComponent,
    JsonViewerComponent,
    TestViewerComponent,
    RoutineV2TestComponent,
    RoutineV1TestComponent,
    AuditPageComponent,
  ],
  imports: [RmaRoutingModule, SharedModule],
  exports: [ContentLayoutComponent],
  providers: [TestOrchestratorService],
})
export class RmaModule {}
