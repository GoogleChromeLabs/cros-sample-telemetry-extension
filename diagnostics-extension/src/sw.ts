// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service worker script
 */

import {
  PortName,
  Request,
  RequestType,
  ResponseErrorInfoMessage,
} from './common/message';
import {handleDiagnostics} from './controllers/diagnostics.controller';
import {
  handleEvents,
  onEventPortConnect,
  registerEventHandlers,
} from './controllers/events.controller';
import {
  handleRoutineV2,
  onRoutineV2PortConnect,
  registerRoutineV2EventHandlers,
} from './controllers/routine-v2.controller';
import {handleTelemetry} from './controllers/telemetry.controller';
import {generateErrorResponse} from './utils';

// Event handlers in service workers need to be declared in the global scope.
registerEventHandlers();
registerRoutineV2EventHandlers();

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    console.log('Service worker is installed!', details);
  },
);

chrome.runtime.onConnectExternal.addListener((port: chrome.runtime.Port) => {
  switch (port.name) {
    case PortName.EVENTS_PORT:
      onEventPortConnect(port);
      return;
    case PortName.ROUTINE_V2_PORT:
      onRoutineV2PortConnect(port);
      return;
    default:
      console.error(ResponseErrorInfoMessage.INVALID_PORT_NAME);
  }
});

chrome.runtime.onMessageExternal.addListener((req: Request, sender, res) => {
  switch (req.type) {
    case RequestType.TELEMETRY:
      return handleTelemetry(req, res);
    case RequestType.DIAGNOSTICS:
      return handleDiagnostics(req, res);
    case RequestType.EVENTS:
      return handleEvents(req, res);
    case RequestType.ROUTINE_V2:
      return handleRoutineV2(req, res);
    default:
      return res(
        generateErrorResponse(ResponseErrorInfoMessage.INVALID_REQUEST_TYPE),
      );
  }
});
