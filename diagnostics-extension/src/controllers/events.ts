// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle event requests
 */

import {
  EventsAction,
  PortName,
  Request,
  Response,
  ResponseErrorInfoMessage,
} from '../common/message';
import {EventCategory} from '../common/telemetry-extension-types';
import {EventsServiceProvider} from '../services/events';
import {generateErrorResponse, generateEventsSuccessResponse} from '../utils';

type EventsController = (
  category: Request,
  res: (data: Response) => void,
) => void;

const eventsService = EventsServiceProvider.getEventsService();

const isEventSupported = async (
  eventType: EventCategory,
  res: (data: Response) => void,
) => {
  try {
    const paylaod = await eventsService.isEventSupported(eventType);
    return res(generateEventsSuccessResponse(paylaod));
  } catch (err) {
    res(generateErrorResponse(String(err)));
  }
};

const startCapturingEvents = async (
  eventType: EventCategory,
  res: (data: Response) => void,
) => {
  try {
    await eventsService.startCapturingEvents(eventType);
    const payload = {};
    return res(generateEventsSuccessResponse(payload));
  } catch (err) {
    res(generateErrorResponse(String(err)));
  }
};

const stopCapturingEvents = async (
  eventType: EventCategory,
  res: (data: Response) => void,
) => {
  try {
    await eventsService.stopCapturingEvents(eventType);
    return res(generateEventsSuccessResponse({}));
  } catch (err) {
    res(generateErrorResponse(String(err)));
  }
};

export const registerEventHandlers = async () => {
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
};

export const onEventPortConnect = async (port: chrome.runtime.Port) => {
  if (port.name === PortName.EVENTS_PORT) {
    eventsService.registerPort(port);
  } else {
    console.error(ResponseErrorInfoMessage.InvalidPortName);
  }
};

export const handleEvents: EventsController = async (req, res) => {
  if (!req.events)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.MissingEventsRequest),
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
        generateErrorResponse(ResponseErrorInfoMessage.InvalidEventsAction),
      );
  }
};
