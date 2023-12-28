// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Card Component in Events.
 * Imported by events.module.ts
 */

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {EventsService} from 'app/core/services/events.service';
import {EventCategory} from 'common/telemetry-extension-types';

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
  // Error message received, undefined if no error occurs.
  public error?: String;
  public state? = EventsCardState.NOT_LISTENING;

  public constructor(
    private eventsService: EventsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.eventsService
      .getSubject(this.category)
      .then((res) => {
        if (res.success && res.subject) {
          res.subject.subscribe({
            next: (event) => {
              this.error = undefined;
              this.eventList.push(event);
              // Angular does not detect changes outside of its detection zone.
              // Since these updates are asynchronous via event notification
              // from extension, manually trigger change detection.
              this.changeDetectorRef.detectChanges();
            },
          });
        } else {
          this.error = res.error;
        }
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

  startCapturingEvents = async () => {
    if (this.state === EventsCardState.LISTENING) {
      console.error('Event is already being captured');
      return;
    }

    this.state = EventsCardState.LISTENING;
    this.eventList = [];
    this.error = undefined;

    this.eventsService
      .startCapturingEvents(this.category)
      .then()
      .catch((err) => {
        this.error = err.message;
      });
  };

  stopCapturingEvents = async () => {
    if (this.state === EventsCardState.NOT_LISTENING) {
      console.error('Event has already stopped captured');
      return;
    }

    this.state = EventsCardState.NOT_LISTENING;

    this.eventsService
      .stopCapturingEvents(this.category)
      .then()
      .catch((err) => {
        this.error = err.message;
      });
  };
}
