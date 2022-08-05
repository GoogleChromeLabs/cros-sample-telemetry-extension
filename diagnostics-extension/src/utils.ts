// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines utility functions
 */

import {
  DiagnosticsResponse,
  Response,
  TelemetryResponse,
} from '@common/message';

export const generateTelemetrySuccessResponse = (
  payload: TelemetryResponse
): Response => {
  return { success: true, telemetry: payload };
};

export const generateDiagnosticsSuccessResponse = (
  payload: DiagnosticsResponse
): Response => {
  return { success: true, diagnostics: payload };
};

export const generateErrorResponse = (message: string): Response => {
  return { success: false, error: { message } };
};
