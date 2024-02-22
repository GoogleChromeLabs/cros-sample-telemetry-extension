import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {RmaRoutingModule} from './rma-routing.module';

@NgModule({
  declarations: [ContentLayoutComponent, LogViewerComponent],
  imports: [RmaRoutingModule, SharedModule],
  exports: [ContentLayoutComponent],
})
export class RmaModule {}
