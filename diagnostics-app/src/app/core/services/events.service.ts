// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service for starting to capture events and stopping
 * capturing events from Chrome extension.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  EventCategory,
  EventsInfo,
  EventSupportStatus,
  EventSupportStatusInfo,
} from '@common/dpsl'
import {
  EventsAction,
  EventMessage,
  EventsRequest,
  EventsResponse,
  Request,
  RequestType,
  Response,
  PortName,
  ResponseErrorInfoMessage,
} from '@common/message';

export interface getSubjectResponse {
  success: Boolean,
  subject?: Subject<EventsInfo>,
  error?: String,
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private extensionId!: string; // the ID of the extension it connects to
  private subjects = new Map<string, Subject<EventsInfo>>; // the map of subjects that
  private port?: chrome.runtime.Port; // the port for connecting with the extension to get the captured event

  private constructEventsRequest: (
    payload: EventsRequest
  ) => Request = payload => {
    return { type: RequestType.EVENTS, events: payload };
  };

  private sendRequest: (request: Request) => Promise<EventsResponse> = (
    request: Request
  ) => {
    return new Promise((resolve, reject) => {
      try {
        //@ts-ignore
        window.chrome.runtime.sendMessage(
          this.extensionId,
          request,
          (response: Response) => {
            if (!response.success) {
              reject(response.error);
            } else if (!response.events) {
              throw 'Invalid response';
            } else {
              resolve(response.events);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  constructor() {
    this.extensionId = environment.extensionId;

    try {
      //@ts-ignore
      this.port = window.chrome.runtime.connect(
        this.extensionId,
        { name: PortName.EVENTS_PORT }
      );

      this.port.onMessage.addListener((msg: EventMessage) => {
        if (this.subjects.has(msg.type)) {
          this.subjects.get(msg.type)!.next(msg.info);
        } else {
          console.error(ResponseErrorInfoMessage.MissingEventsTypeSubject);
        }
      });

    } catch (err) {
      console.error(ResponseErrorInfoMessage.FailedEventsServiceConstructor);
    }
  }

  getSubject: (category: EventCategory) => Promise<getSubjectResponse> = async (category) => {
    if (!this.subjects.has(category)) {
      try {
        let statusInfo = await this.isEventSupported(category);
        statusInfo = statusInfo as EventSupportStatusInfo;
        if (statusInfo.status === EventSupportStatus.supported) {
          this.subjects.set(category, new Subject<EventsInfo>);
        }
      } catch (err) {
        return { success: false, error: String(err) };
      }
      
    }
    return { success: true, subject: this.subjects.get(category)! };
  }

  isEventSupported: (eventType: EventCategory) => Promise<EventsResponse> = eventType => {
    const payload: EventsRequest = {
      action: EventsAction.IS_EVENT_SUPPORTED,
      eventType,
    };
    const request = this.constructEventsRequest(payload);
    return this.sendRequest(request);
  }

  startCapturingEvents: (eventType: EventCategory) => Promise<EventsResponse> = eventType => {
    const payload: EventsRequest = {
      action: EventsAction.START_CAPTURING_EVENT,
      eventType,
    };
    const request = this.constructEventsRequest(payload);
    return this.sendRequest(request);
  }

  stopCapturingEvents: (eventType: EventCategory) => Promise<EventsResponse> = eventType => {
    const payload: EventsRequest = {
      action: EventsAction.STOP_CAPTURING_EVENT,
      eventType,
    };
    const request = this.constructEventsRequest(payload);
    return this.sendRequest(request);
  }
}
