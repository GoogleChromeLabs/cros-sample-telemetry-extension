// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the CardContent Component in Events.
 * Imported by events.module.ts
 */

import { Component, OnInit } from '@angular/core';

import {
  EventCategory,
  EventSupportStatus,
  EventSupportStatusInfo
} from '@common/dpsl';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit {
  private _error?: string; // the error message if there is any error

  // Array of events categories that should be display if supported
  readonly _visibleCategories: EventCategory[] = [
    EventCategory.audio_jack,
    EventCategory.power,
    EventCategory.touchpad_touch,
    EventCategory.touchscreen_touch,
    EventCategory.lid,
    EventCategory.stylus_connected,
  ];
  // Array of events categories that will actually be displayed
  private _supportedCategories: EventCategory[] = [];

  get error() { return this._error; }
  get supportedCategories() { return this._supportedCategories; }
  
  async isEventSupported(category: EventCategory) {
    try {
      let statusInfo = await this.eventsService.isEventSupported(category);
      statusInfo = statusInfo as EventSupportStatusInfo;
      if (statusInfo.status === EventSupportStatus.supported) {
        this._supportedCategories.push(category);
      }
    } catch (err) {
      this._error = String(err);
    }
  }

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    for (let category of this._visibleCategories) {
      this.isEventSupported(category);
    }
  }
}
