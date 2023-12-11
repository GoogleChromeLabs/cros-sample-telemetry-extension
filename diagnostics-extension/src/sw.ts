// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service worker script
 */

import {Request, RequestType, ResponseErrorInfoMessage} from './common/message';
import {handleDiagnostics} from './controllers/diagnostics';
import {
  handleEvents,
  onEventPortConnect,
  registerEventHandlers,
} from './controllers/events';
import {handleTelemetry} from './controllers/telemetry';
import {generateErrorResponse} from './utils';

// Event handlers in service workers need to be declared in the global scope.
registerEventHandlers();

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    console.log('Service worker is installed!', details);
  },
);

chrome.runtime.onConnectExternal.addListener((port: chrome.runtime.Port) => {
  onEventPortConnect(port);
});

chrome.runtime.onMessageExternal.addListener((req: Request, sender, res) => {
  console.log(req, sender);
  switch (req.type) {
    case RequestType.TELEMETRY:
      return handleTelemetry(req, res);
    case RequestType.DIAGNOSTICS:
      return handleDiagnostics(req, res);
    case RequestType.EVENTS:
      return handleEvents(req, res);
    default:
      return res(
        generateErrorResponse(ResponseErrorInfoMessage.InvalidRequestType),
      );
  }
});
