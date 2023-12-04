import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {RoutineV2DashboardComponent} from './routine-v2-dashboard/routine-v2-dashboard.component';

@NgModule({
  declarations: [RoutineV2DashboardComponent],
  imports: [CommonModule, SharedModule],
})
export class RoutineV2Module {}
