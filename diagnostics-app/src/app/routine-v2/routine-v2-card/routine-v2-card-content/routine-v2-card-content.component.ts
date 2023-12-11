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

  // this function is used for maintaining the attributes' original order
  public originalOrder = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a: KeyValue<number, string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _b: KeyValue<number, string>,
  ): number => 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isPrimitiveType(a: any) {
    return typeof a !== 'object';
  }

  constructor() {}
}