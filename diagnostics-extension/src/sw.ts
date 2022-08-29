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
import { handleEvents } from './controllers/events';
import { handleTelemetry } from './controllers/telemetry';
import { generateErrorResponse } from './utils';

chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    console.log('Service worker is installed!', details);
  }
);

chrome.runtime.onMessageExternal.addListener((req: Request, sender, res) => {
  // check if the senders origin contains the `cros-sample-telemetry-extension`
  // path and block the request if not.
  const path = "googlechromelabs.github.io/cros-sample-telemetry-extension";
  if (!sender.url?.startsWith(path)) {
    console.log("This PWA is not allowed to access the extension");
    return;
  }

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
