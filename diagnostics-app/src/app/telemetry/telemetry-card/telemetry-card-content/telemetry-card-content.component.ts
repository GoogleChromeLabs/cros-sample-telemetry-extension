// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the CardContent Component in Telemetry.
 * Imported by telemetry.module.ts
 */

import {Component, Input} from '@angular/core';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-telemetry-card-content',
  templateUrl: './telemetry-card-content.component.html',
  styleUrls: ['./telemetry-card-content.component.css'],
})
export class TelemetryCardContentComponent {
  @Input({required: true}) info!: Object;

  // this function is used for maintaining the attributes' original order
  public originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>,
  ): number => 0;

  public isPrimitiveType(a: any) {
    return typeof a !== 'object';
  }

  constructor() {}
}
