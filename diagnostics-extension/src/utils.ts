// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines utility functions
 */

import {
  DiagnosticsResponse,
  EventsResponse,
  Response,
  RoutineV2Response,
  TelemetryResponse,
} from './common/message';

export const generateTelemetrySuccessResponse = (
  payload: TelemetryResponse,
): Response => {
  return {success: true, telemetry: payload};
};

export const generateDiagnosticsSuccessResponse = (
  payload: DiagnosticsResponse,
): Response => {
  return {success: true, diagnostics: payload};
};

export const generateEventsSuccessResponse = (
  payload?: EventsResponse,
): Response => {
  return {success: true, events: payload};
};

export const generateRoutineV2SuccessResponse = (
  payload?: RoutineV2Response,
): Response => {
  return {success: true, routineV2: payload};
};

export const generateErrorResponse = (message: string): Response => {
  return {success: false, error: {message}};
};
