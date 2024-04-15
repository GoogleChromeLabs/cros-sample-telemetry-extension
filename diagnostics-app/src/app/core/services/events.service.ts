// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service for starting to capture events and stopping
 * capturing events from Chrome extension.
 */

import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';

import {VISIBLE_EVENT_CARDS} from 'common/config/support-assist';
import {
  EventMessage,
  EventsAction,
  EventsInfoUnion,
  EventsRequest,
  EventsResponse,
  PortName,
  Request,
  RequestType,
  Response,
  ResponseErrorInfoMessage,
} from 'common/message';
import {
  EventCategory,
  EventSupportStatus,
  EventSupportStatusInfo,
} from 'common/telemetry-extension-types/events';
import {environment} from 'environments/environment';

export interface getSubjectResponse {
  success: Boolean;
  subject?: Subject<EventsInfoUnion>;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  // The ID of the extension event service connects to.
  private extensionId: string = environment.extensionId;
  // Maps the event category to its corresponding subject.
  private subjects = new Map<EventCategory, Subject<EventsInfoUnion>>();
  // The port for connecting with the extension to get the captured event.
  private port?: chrome.runtime.Port;

  // A cache to preload the supported events.
  private supportabilityCache: Map<EventCategory, Promise<EventsResponse>> =
    new Map<EventCategory, Promise<EventsResponse>>();

  constructor(private ngZone: NgZone) {}

  private constructEventsRequest(payload: EventsRequest): Request {
    return {type: RequestType.EVENTS, events: payload};
  }

  private sendRequest(request: Request): Promise<EventsResponse> {
    return new Promise((resolve, reject) => {
      try {
        window.chrome.runtime.sendMessage(
          this.extensionId,
          request,
          (response: Response) => {
            if (!response.success) {
              return reject(response.error);
            } else if (!response.events) {
              throw 'Invalid response';
            } else {
              return resolve(response.events);
            }
          },
        );
      } catch (err) {
        return reject(err);
      }
    });
  }

  public Init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.port = window.chrome.runtime.connect(this.extensionId, {
          name: PortName.EVENTS_PORT,
        });
        this.port.onMessage.addListener((msg: EventMessage) => {
          // Port messages are asynchronous and inherently outside of angular
          // detection zone. Wrap listener in `ngZone.run()` to ensure all
          // components are updated.
          this.ngZone.run(() => {
            if (this.subjects.has(msg.type)) {
              this.subjects.get(msg.type)!.next(msg.info);
            } else {
              console.error(
                ResponseErrorInfoMessage.MISSING_EVENTS_TYPE_SUBJECT,
              );
            }
          });
        });
        for (const category of VISIBLE_EVENT_CARDS) {
          this.isEventSupported(category);
        }
        return resolve();
      } catch (err) {
        console.error(
          ResponseErrorInfoMessage.FAILED_PORT_CONNECTION_SERVICE_CONSTRUCTOR,
        );
        return reject();
      }
    });
  }

  public async getSubject(
    category: EventCategory,
  ): Promise<getSubjectResponse> {
    if (!this.isEventSupported(category)) {
      console.error(
        'A getSubject request is called on unsupported event: ',
        category,
      );
      return Promise.reject({success: false, error: 'Unsupported event'});
    }

    if (!this.subjects.has(category)) {
      try {
        let statusInfo = await this.isEventSupported(category);
        statusInfo = statusInfo as EventSupportStatusInfo;
        if (statusInfo.status === EventSupportStatus.supported) {
          this.subjects.set(category, new Subject<EventsInfoUnion>());
        }
      } catch (err) {
        return {success: false, error: String(err)};
      }
    }
    return {success: true, subject: this.subjects.get(category)!};
  }

  public isEventSupported(eventType: EventCategory): Promise<EventsResponse> {
    const payload: EventsRequest = {
      action: EventsAction.IS_EVENT_SUPPORTED,
      eventType,
    };
    if (!this.supportabilityCache.has(eventType)) {
      const request = this.constructEventsRequest(payload);
      const promise = this.sendRequest(request);
      this.supportabilityCache.set(eventType, promise);
    }
    return this.supportabilityCache.get(eventType)!;
  }

  public startCapturingEvents(
    eventType: EventCategory,
  ): Promise<EventsResponse> {
    const payload: EventsRequest = {
      action: EventsAction.START_CAPTURING_EVENT,
      eventType,
    };
    const request = this.constructEventsRequest(payload);
    return this.sendRequest(request);
  }

  public stopCapturingEvents(
    eventType: EventCategory,
  ): Promise<EventsResponse> {
    const payload: EventsRequest = {
      action: EventsAction.STOP_CAPTURING_EVENT,
      eventType,
    };
    const request = this.constructEventsRequest(payload);
    return this.sendRequest(request);
  }
}
