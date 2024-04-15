// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle event requests
 */

import {
  EventsAction,
  Request,
  Response,
  ResponseErrorInfoMessage,
} from '../common/message';
import {EventCategory} from '../common/telemetry-extension-types/events';
import {EventsServiceProvider} from '../services/events.service';
import {generateErrorResponse, generateEventsSuccessResponse} from '../utils';

const eventsService = EventsServiceProvider.getEventsService();

async function isEventSupported(
  eventType: EventCategory,
  res: (data: Response) => void,
) {
  try {
    const paylaod = await eventsService.isEventSupported(eventType);
    return res(generateEventsSuccessResponse(paylaod));
  } catch (err) {
    return res(generateErrorResponse(String(err)));
  }
}

async function startCapturingEvents(
  eventType: EventCategory,
  res: (data: Response) => void,
) {
  try {
    await eventsService.startCapturingEvents(eventType);
    const payload = {};
    return res(generateEventsSuccessResponse(payload));
  } catch (err) {
    return res(generateErrorResponse(String(err)));
  }
}

async function stopCapturingEvents(
  eventType: EventCategory,
  res: (data: Response) => void,
) {
  try {
    await eventsService.stopCapturingEvents(eventType);
    return res(generateEventsSuccessResponse({}));
  } catch (err) {
    return res(generateErrorResponse(String(err)));
  }
}

export async function registerEventHandlers() {
  eventsService
    .registerEventHandlers()
    .then((response) => {
      if (!response.success) {
        console.error(response.error?.message);
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
}

export async function handleEvents(
  req: Request,
  res: (data: Response) => void,
): Promise<void> {
  if (!req.events)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.MISSING_EVENTS_REQUEST),
    );

  const eventType = req.events.eventType;
  switch (req.events.action) {
    case EventsAction.IS_EVENT_SUPPORTED:
      return isEventSupported(eventType, res);
    case EventsAction.START_CAPTURING_EVENT:
      return startCapturingEvents(eventType, res);
    case EventsAction.STOP_CAPTURING_EVENT:
      return stopCapturingEvents(eventType, res);
    default:
      return res(
        generateErrorResponse(ResponseErrorInfoMessage.INVALID_EVENTS_ACTION),
      );
  }
}
