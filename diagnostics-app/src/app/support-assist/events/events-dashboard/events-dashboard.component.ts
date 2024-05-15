/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the CardContent Component in Events.
 * Imported by events.module.ts
 */

import {Component, OnInit} from '@angular/core';

import {EventsService} from 'app/core/services/events.service';
import {VISIBLE_EVENT_CARDS} from 'common/config/support-assist';
import {
  EventCategory,
  EventSupportStatus,
  EventSupportStatusInfo,
} from 'common/telemetry-extension-types/events';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css'],
})
export class EventsDashboardComponent implements OnInit {
  // The error message received, undefined if no error occurs.
  public error?: string;
  // Array of events categories that is supported, checked via healthd API.
  public supportedCategories: EventCategory[] = [];

  public async isEventSupported(category: EventCategory) {
    try {
      let statusInfo = await this.eventsService.isEventSupported(category);
      statusInfo = statusInfo as EventSupportStatusInfo;
      if (statusInfo.status === EventSupportStatus.supported) {
        this.supportedCategories.push(category);
        this.supportedCategories.sort();
      }
    } catch (err) {
      this.error = String(err);
    }
  }

  public constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    for (const category of VISIBLE_EVENT_CARDS) {
      this.isEventSupported(category);
    }
  }
}
