// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service worker script
 */

import {
  Request,
  RequestType,
  ResponseErrorInfoMessage,
} from '@common/message';
import { handleDiagnostics } from './controllers/diagnostics';
import {
  handleEvents,
  onEventPortConnect,
} from './controllers/events';
import { handleTelemetry } from './controllers/telemetry';
import { generateErrorResponse } from './utils';
import { registerEventHandlers } from './controllers/events';

let isFirstConnection: boolean; // true if the it's the first port connection from the UI

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    console.log('Service worker is installed!', details);
    registerEventHandlers();
  }
);

chrome.runtime.onConnectExternal.addListener((port: chrome.runtime.Port) => {
  // the event handlers should only be registered for once
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
        generateErrorResponse(ResponseErrorInfoMessage.InvalidRequestType)
      );
  }
});
