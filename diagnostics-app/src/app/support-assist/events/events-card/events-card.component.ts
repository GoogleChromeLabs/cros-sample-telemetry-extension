/**
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the Card Component in Events.
 * Imported by events.module.ts
 */

import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from 'app/core/services/events.service';
import {LoggingService} from 'app/core/services/logging.service';
import {EventCategory} from 'common/telemetry-extension-types/events';
import {Subscription} from 'rxjs';

enum EventsCardState {
  LISTENING = 'listening',
  NOT_LISTENING = 'not_listening',
}

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css'],
})
export class EventsCardComponent implements OnInit {
  @Input({required: true}) category!: EventCategory;

  public EventsCardState = EventsCardState;

  // Array of all events received from healthd API. These are the outputs that
  // will be shown for each card.
  public eventList: object[] = [];
  // The error message, undefined if no error occurs.
  public error?: string;
  public state? = EventsCardState.NOT_LISTENING;
  // Stores all the rxjs subscriptions made by the component, needs to be
  // unsubscribed during component destruction.
  private subscriptions: Subscription[] = [];

  public constructor(
    private eventsService: EventsService,
    private loggingService: LoggingService,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const res = await this.eventsService.getSubject(this.category);
      if (!res.success) {
        this.loggingService.error('Failed to get event subject: ', res.error);
        this.error = res.error;
        return;
      }

      if (!res.subject) {
        this.loggingService.error('Unexpected event subject: ', res);
        this.error = 'Unexpected event subject';
        return;
      }

      this.subscriptions.push(
        res.subject.subscribe({
          next: (event) => {
            this.error = undefined;
            this.eventList.push(event);
          },
        }),
      );
    } catch (err) {
      this.loggingService.error('Failed to get event subject: ', err);
      this.error = (err as Error).message;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  startCapturingEvents = async () => {
    try {
      if (this.state === EventsCardState.LISTENING) {
        this.loggingService.error('Event has already stopped captured');
        return;
      }
      this.state = EventsCardState.LISTENING;
      this.state = EventsCardState.LISTENING;
      this.eventList = [];
      this.error = undefined;
      this.eventsService.startCapturingEvents(this.category);
    } catch (err) {
      this.loggingService.error('Failed to stop capturing event: ', err);
      this.error = (err as Error).message;
    }
  };

  stopCapturingEvents = async () => {
    try {
      if (this.state === EventsCardState.NOT_LISTENING) {
        this.loggingService.error('Event has already stopped captured');
        return;
      }
      this.state = EventsCardState.NOT_LISTENING;
      this.eventsService.stopCapturingEvents(this.category);
    } catch (err) {
      this.loggingService.error('Failed to stop capturing event: ', err);
      this.error = (err as Error).message;
    }
  };
}
