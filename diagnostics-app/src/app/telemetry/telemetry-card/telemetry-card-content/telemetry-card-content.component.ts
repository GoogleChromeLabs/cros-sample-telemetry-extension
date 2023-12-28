// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the CardContent Component in Telemetry.
 * Imported by telemetry.module.ts
 */

import {KeyValue} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-telemetry-card-content',
  templateUrl: './telemetry-card-content.component.html',
  styleUrls: ['./telemetry-card-content.component.css'],
})
export class TelemetryCardContentComponent {
  @Input({required: true}) info!: Object;

  // This function is used for maintaining the attributes' original order.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public originalOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>,
  ): number {
    return 0;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isPrimitiveType(a: any) {
    return typeof a !== 'object';
  }
}
