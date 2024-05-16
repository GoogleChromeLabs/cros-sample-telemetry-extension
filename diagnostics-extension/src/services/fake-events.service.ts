/**
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Functions to generate fake events data.
 */

// Fake data may not use certain parameter variables.
/* eslint-disable @typescript-eslint/no-unused-vars */

import {PortName, Response} from '../common/message';
import {
  EventCategory,
  EventSupportStatus,
  EventSupportStatusInfo,
} from '../common/telemetry-extension-types/events';
import {PortService} from './port.service';

const categoryToIntervalId: Map<
  EventCategory,
  ReturnType<typeof setTimeout>
> = new Map<EventCategory, ReturnType<typeof setTimeout>>();
const fakeEventData: Map<EventCategory, object> = new Map<
  EventCategory,
  object
>();
const fakeDataInterval: number = 3000; // Send fake data every 3 seconds.

export async function registerEventHandlers(): Promise<Response> {
  return {success: true};
}

function notifyPort(type: EventCategory, message: object): void {
  const port = PortService.getInstance().getPort(PortName.EVENTS_PORT);
  if (!port) {
    console.error('port not connected');
    return;
  }
  port.postMessage({
    type: type,
    info: message,
  });
  return;
}

function getFakeData(type: EventCategory): object {
  if (fakeEventData.has(type)) {
    return fakeEventData.get(type)!;
  }
  return {type: 'no mocked data'};
}

// Default to support all events in fake data.
export async function isEventSupported(
  eventType: EventCategory,
): Promise<EventSupportStatusInfo> {
  const res: EventSupportStatusInfo = {
    status: EventSupportStatus.supported,
  };
  return res;
}

// Set a timer to periodically send fake data once event starts capturing.
export async function startCapturingEvents(
  eventType: EventCategory,
): Promise<void> {
  categoryToIntervalId.set(
    eventType,
    setInterval(() => {
      notifyPort(eventType, getFakeData(eventType));
    }, fakeDataInterval),
  );
  return;
}

// Destroy the event timer.
export async function stopCapturingEvents(
  eventType: EventCategory,
): Promise<void> {
  if (categoryToIntervalId.has(eventType)) {
    clearInterval(categoryToIntervalId.get(eventType));
  }
  categoryToIntervalId.delete(eventType);
  return;
}
