// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Card Component in Events.
 * Imported by events.module.ts
 */

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {EventCategory, EventsCardState,} from '@common/dpsl';
import {ResponseErrorInfoMessage} from '@common/message';
import {EventsService} from 'src/app/core/services/events.service';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css'],
})
export class EventsCardComponent implements OnInit {
  @Input({required: true}) category!: EventCategory;

  public eventList: object[] = [];
  public error?: String;  // the error message received, null if no error occurs
  public state? = EventsCardState.NOT_LISTENING;

  constructor(
      private eventsService: EventsService,
      private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.eventsService.getSubject(this.category)
        .then(res => {
          if (res.success && res.subject) {
            res.subject.subscribe({
              next: event => {
                this.error = undefined;
                this.eventList.push(event);

                // this is for triggering Angular change detection
                this.changeDetectorRef.detectChanges();
              }
            })
          } else {
            this.error = res.error;
          }
        })
        .catch(err => {
          this.error = err.message;
        });
  }

  startCapturingEvents =
      async () => {
    if (this.state == EventsCardState.LISTENING) {
      console.error('Event is already being captured');
      return;
    }
    
    this.state = EventsCardState.LISTENING;
    this.eventList = [];
    this.error = undefined;

    this.eventsService.startCapturingEvents(this.category).then().catch(err => {
      this.error = err.message;
    })
  }

  stopCapturingEvents = async () => {
    if (this.state == EventsCardState.NOT_LISTENING) {
      console.error('Event has already stopped captured');
      return;
    }
    
    this.state = EventsCardState.NOT_LISTENING;

    this.eventsService.stopCapturingEvents(this.category).then().catch(err => {
      this.error = err.message;
    })
  }
}
