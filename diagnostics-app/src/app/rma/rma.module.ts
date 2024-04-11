import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {TestOrchestratorService} from 'app/core/services/test-orchestrator.service';
import {WebcamModule} from 'ngx-webcam';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {RmaRoutingModule} from './rma-routing.module';
import {RmaSidebarComponent} from './rma-sidebar/rma-sidebar.component';
import {AudioTestComponent} from './test-viewer/audio-test/audio-test.component';
import {AuditPageComponent} from './test-viewer/audit-page/audit-page.component';
import {CameraTestComponent} from './test-viewer/camera-test/camera-test.component';
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
    CameraTestComponent,
    AudioTestComponent,
  ],
  imports: [RmaRoutingModule, SharedModule, WebcamModule],
  exports: [ContentLayoutComponent],
  providers: [TestOrchestratorService],
})
export class RmaModule {}
