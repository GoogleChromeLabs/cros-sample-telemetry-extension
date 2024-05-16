/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Service worker script
 */

import {Request, RequestType, ResponseErrorInfoMessage} from './common/message';
import {handleDiagnostics} from './controllers/diagnostics.controller';
import {
  handleEvents,
  registerEventHandlers,
} from './controllers/events.controller';
import {
  handleRoutineV2,
  registerRoutineV2EventHandlers,
} from './controllers/routine-v2.controller';
import {handleTelemetry} from './controllers/telemetry.controller';
import {PortService} from './services/port.service';
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
  PortService.getInstance().registerPort(port);
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
