/**
 * @fileoverview Defines the CardContent Component in Events.
 * Imported by events.module.ts
 */

import {Component, Input} from '@angular/core';
import {isPrimitiveType, originalOrder} from 'app/core/app-utils';

@Component({
  selector: 'app-events-card-content',
  templateUrl: './events-card-content.component.html',
  styleUrls: ['./events-card-content.component.css'],
})
export class EventsCardContentComponent {
  @Input({required: true}) event!: Object;

  // Used in HTML template.
  public originalOrder = originalOrder;
  public isPrimitiveType = isPrimitiveType;
}
