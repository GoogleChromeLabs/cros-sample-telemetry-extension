/**
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the CardContent Component in Telemetry.
 * Imported by telemetry.module.ts
 */

import {Component, Input} from '@angular/core';
import {isPrimitiveType, originalOrder} from 'app/core/app-utils';

@Component({
  selector: 'app-telemetry-card-content',
  templateUrl: './telemetry-card-content.component.html',
  styleUrls: ['./telemetry-card-content.component.css'],
})
export class TelemetryCardContentComponent {
  @Input({required: true}) info!: Object;

  // Used in HTML template.
  public originalOrder = originalOrder;
  public isPrimitiveType = isPrimitiveType;
}
