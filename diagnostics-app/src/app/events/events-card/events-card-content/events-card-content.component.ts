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
