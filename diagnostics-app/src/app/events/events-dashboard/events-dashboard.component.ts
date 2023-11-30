// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the CardContent Component in Events.
 * Imported by events.module.ts
 */

import {Component, OnInit} from '@angular/core';

import {
  EventCategory,
  EventSupportStatus,
  EventSupportStatusInfo,
} from '@common/telemetry-extension-types';
import {EventsService} from 'src/app/core/services/events.service';
import {VISIBLE_EVENT_CARDS} from 'src/config/config';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css'],
})
export class EventsDashboardComponent implements OnInit {
  private _error?: string; // the error message if there is any error

  // Array of events categories that will actually be displayed
  private _supportedCategories: EventCategory[] = [];

  get error() {
    return this._error;
  }
  get supportedCategories() {
    return this._supportedCategories;
  }

  async isEventSupported(category: EventCategory) {
    try {
      let statusInfo = await this.eventsService.isEventSupported(category);
      statusInfo = statusInfo as EventSupportStatusInfo;
      if (statusInfo.status === EventSupportStatus.supported) {
        this._supportedCategories.push(category);
        this._supportedCategories.sort();
      }
    } catch (err) {
      this._error = String(err);
    }
  }

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    for (const category of VISIBLE_EVENT_CARDS) {
      this.isEventSupported(category);
    }
  }
}
