// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the CardContent Component in Events.
 * Imported by events.module.ts
 */

import {KeyValue} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-events-card-content',
  templateUrl: './events-card-content.component.html',
  styleUrls: ['./events-card-content.component.css'],
})
export class EventsCardContentComponent {
  @Input({required: true}) event!: Object;

  // This function is used for maintaining the attributes' original order.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public originalOrder(
    _a: KeyValue<number, string>,
    _b: KeyValue<number, string>,
  ): number {
    return 0;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isPrimitiveType(a: any) {
    return typeof a !== 'object';
  }
}
