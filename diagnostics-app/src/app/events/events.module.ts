import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsCardComponent } from './events-card/events-card.component';
import { EventsCardContentComponent } from './events-card/events-card-content/events-card-content.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EventsCardComponent,
    EventsCardContentComponent,
    EventsDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EventsModule { }
