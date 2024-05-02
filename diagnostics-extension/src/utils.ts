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

export function generateTelemetrySuccessResponse(
  payload: TelemetryResponse,
): Response {
  return {success: true, telemetry: payload};
}

export function generateDiagnosticsSuccessResponse(
  payload: DiagnosticsResponse,
): Response {
  return {success: true, diagnostics: payload};
}

export function generateEventsSuccessResponse(
  payload?: EventsResponse,
): Response {
  return {success: true, events: payload};
}

export function generateRoutineV2SuccessResponse(
  payload?: RoutineV2Response,
): Response {
  return {success: true, routineV2: payload};
}

export function generateErrorResponse(message: string): Response {
  return {success: false, error: {message}};
}
