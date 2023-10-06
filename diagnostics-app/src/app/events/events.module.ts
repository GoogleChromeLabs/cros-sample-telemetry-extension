import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsCardContentComponent } from './events-card/events-card-content/events-card-content.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';

@NgModule({
  declarations: [
    EventsCardContentComponent,
    EventsDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }
