// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the CardContent Component in Routine V2.
 * Imported by routine-v2.module.ts
 */

import {KeyValue} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-routine-v2-card-content',
  templateUrl: './routine-v2-card-content.component.html',
  styleUrls: ['./routine-v2-card-content.component.css'],
})
export class RoutineV2CardContentComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({required: true}) output!: any;

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

  public constructor() {}
}
