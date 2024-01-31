import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {RmaRoutingModule} from './rma-routing.module';

@NgModule({
  declarations: [ContentLayoutComponent],
  imports: [RmaRoutingModule, SharedModule],
  exports: [ContentLayoutComponent],
})
export class RmaModule {}
