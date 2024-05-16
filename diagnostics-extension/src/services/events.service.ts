/**
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Classes related to events
 */

// The API calls to chrome.os* are not defined in the standard chrome type.
// Allow type-casting into any for access.
/* eslint-disable @typescript-eslint/no-explicit-any */

import {PortName, Response} from '../common/message';
import {
  EventCategory,
  EventSupportStatusInfo,
} from '../common/telemetry-extension-types/events';
import {environment} from '../environments/environment';
import {generateErrorResponse, generateEventsSuccessResponse} from '../utils';
import * as fakeEvents from './fake-events.service';
import {PortService} from './port.service';

/**
 * Abstract class reprensenting the interface of
 * service to handle events
 */
export abstract class EventsService {
  abstract registerEventHandlers(): Promise<Response>;
  abstract isEventSupported(
    eventType: EventCategory,
  ): Promise<EventSupportStatusInfo>;
  abstract startCapturingEvents(eventType: EventCategory): Promise<void>;
  abstract stopCapturingEvents(eventType: EventCategory): Promise<void>;

  getPort(): chrome.runtime.Port | undefined {
    return PortService.getInstance().getPort(PortName.EVENTS_PORT);
  }
}

/**
 * Implementation of EventsService
 * @extends EventsService
 */
export class EventsServiceImpl extends EventsService {
  private port!: chrome.runtime.Port;

  private eventCategoryAndMethods: {type: EventCategory; func: any}[] = [
    {
      type: EventCategory.audio_jack,
      func: (chrome as any).os.events.onAudioJackEvent,
    },
    {
      type: EventCategory.external_display,
      func: (chrome as any).os.events.onExternalDisplayEvent,
    },
    {
      type: EventCategory.keyboard_diagnostic,
      func: (chrome as any).os.events.onKeyboardDiagnosticEvent,
    },
    {
      type: EventCategory.lid,
      func: (chrome as any).os.events.onLidEvent,
    },
    {
      type: EventCategory.sd_card,
      func: (chrome as any).os.events.onSdCardEvent,
    },
    {
      type: EventCategory.stylus_connected,
      func: (chrome as any).os.events.onStylusConnectedEvent,
    },
    {
      type: EventCategory.stylus_garage,
      func: (chrome as any).os.events.onStylusGarageEvent,
    },
    {
      type: EventCategory.stylus_touch,
      func: (chrome as any).os.events.onStylusTouchEvent,
    },
    {
      type: EventCategory.touchpad_button,
      func: (chrome as any).os.events.onTouchpadButtonEvent,
    },
    {
      type: EventCategory.touchpad_connected,
      func: (chrome as any).os.events.onTouchpadConnectedEvent,
    },
    {
      type: EventCategory.touchpad_touch,
      func: (chrome as any).os.events.onTouchpadTouchEvent,
    },
    {
      type: EventCategory.touchscreen_connected,
      func: (chrome as any).os.events.onTouchscreenConnectedEvent,
    },
    {
      type: EventCategory.touchscreen_touch,
      func: (chrome as any).os.events.onTouchscreenTouchEvent,
    },
    {
      type: EventCategory.usb,
      func: (chrome as any).os.events.onUsbEvent,
    },
    {
      type: EventCategory.power,
      func: (chrome as any).os.events.onPowerEvent,
    },
  ];

  private notifyPort(type: EventCategory, event): void {
    const port = this.getPort();
    if (!port) {
      return;
    }
    port.postMessage({
      type: type,
      info: event,
    });
    return;
  }

  public async registerEventHandlers(): Promise<Response> {
    try {
      for (const item of this.eventCategoryAndMethods) {
        (item.func as any).addListener(this.notifyPort.bind(this, item.type));
      }
      return generateEventsSuccessResponse();
    } catch (err) {
      return generateErrorResponse(String(err));
    }
  }

  public async isEventSupported(
    eventType: EventCategory,
  ): Promise<EventSupportStatusInfo> {
    return (chrome as any).os.events.isEventSupported(eventType);
  }

  public async startCapturingEvents(eventType: EventCategory): Promise<void> {
    return (chrome as any).os.events.startCapturingEvents(eventType);
  }

  public async stopCapturingEvents(eventType: EventCategory): Promise<void> {
    return (chrome as any).os.events.stopCapturingEvents(eventType);
  }
}

/**
 * Fake implementation of EventsService
 * @extends EventsService
 */
export class FakeEventsService extends EventsService {
  public async registerEventHandlers(): Promise<Response> {
    return fakeEvents.registerEventHandlers();
  }

  public async isEventSupported(
    eventType: EventCategory,
  ): Promise<EventSupportStatusInfo> {
    return fakeEvents.isEventSupported(eventType);
  }

  public async startCapturingEvents(eventType: EventCategory): Promise<void> {
    return fakeEvents.startCapturingEvents(eventType);
  }

  public async stopCapturingEvents(eventType: EventCategory): Promise<void> {
    return fakeEvents.stopCapturingEvents(eventType);
  }
}

export class EventsServiceProvider {
  private static instance: EventsService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getEventsService(): EventsService {
    if (!this.instance) {
      if (environment.testModeEnabled) {
        this.instance = new FakeEventsService();
      } else {
        this.instance = new EventsServiceImpl();
      }
    }
    return this.instance;
  }
}
