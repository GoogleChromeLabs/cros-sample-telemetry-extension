import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {RoutineV2CardContentComponent} from './routine-v2-card/routine-v2-card-content/routine-v2-card-content.component';
import {RoutineV2CardComponent} from './routine-v2-card/routine-v2-card.component';
import {RoutineV2DashboardComponent} from './routine-v2-dashboard/routine-v2-dashboard.component';

@NgModule({
  declarations: [
    RoutineV2DashboardComponent,
    RoutineV2CardContentComponent,
    RoutineV2CardComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class RoutineV2Module {}
