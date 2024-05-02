/**
 * @fileoverview Defines the CardContent Component in Routine V2.
 * Imported by routine-v2.module.ts
 */

import {Component, Input} from '@angular/core';
import {isPrimitiveType, originalOrder} from 'app/core/app-utils';

@Component({
  selector: 'app-routine-v2-card-content',
  templateUrl: './routine-v2-card-content.component.html',
  styleUrls: ['./routine-v2-card-content.component.css'],
})
export class RoutineV2CardContentComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({required: true}) output!: any;

  // Used in HTML template.
  public originalOrder = originalOrder;
  public isPrimitiveType = isPrimitiveType;
}
