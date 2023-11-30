// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Functions to generate fake events data.
 */

// Fake data may not use certain parameter variables.
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  EventCategory,
  EventSupportStatusInfo,
  EventSupportStatus,
} from '@common/dpsl';
import {PortName, Response} from '@common/message';

let eventPort: chrome.runtime.Port;
const categoryToIntervalId: Map<
  EventCategory,
  ReturnType<typeof setTimeout>
> = new Map<EventCategory, ReturnType<typeof setTimeout>>();
const fakeEventData: Map<EventCategory, object> = new Map<
  EventCategory,
  object
>();
const fakeDataInterval: number = 3000; // Send fake data every 3 seconds.

export const registerEventHandlers = async (): Promise<Response> => {
  return {success: true};
};

export const registerPort = (port: chrome.runtime.Port): void => {
  eventPort = port;
  return;
};

const notifyPort = (type: EventCategory, message: object): void => {
  if (!eventPort) {
    return;
  }
  eventPort.postMessage({
    type: type,
    info: message,
  });
  return;
};

const getFakeData = (type: EventCategory): object => {
  if (fakeEventData.has(type)) {
    return fakeEventData.get(type)!;
  }
  return {type: 'no mocked data'};
};

// Default to support all events in fake data.
export const isEventSupported = async (
  eventType: EventCategory,
): Promise<EventSupportStatusInfo> => {
  const res: EventSupportStatusInfo = {
    status: EventSupportStatus.supported,
  };
  return res;
};

// Set a timer to periodically send fake data once event starts capturing.
export const startCapturingEvents = async (
  eventType: EventCategory,
): Promise<void> => {
  categoryToIntervalId.set(
    eventType,
    setInterval(() => {
      notifyPort(eventType, getFakeData(eventType));
    }, fakeDataInterval),
  );
  return;
};

// Destroy the event timer.
export const stopCapturingEvents = async (
  eventType: EventCategory,
): Promise<void> => {
  if (categoryToIntervalId.has(eventType)) {
    clearInterval(categoryToIntervalId.get(eventType));
  }
  categoryToIntervalId.delete(eventType);
  return;
};
