import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {EventsCardContentComponent} from './events-card/events-card-content/events-card-content.component';
import {EventsCardComponent} from './events-card/events-card.component';
import {EventsDashboardComponent} from './events-dashboard/events-dashboard.component';

@NgModule({
  declarations: [
    EventsCardComponent,
    EventsCardContentComponent,
    EventsDashboardComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class EventsModule {}
