// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Types regarding communication between
 * diagostics-app and diagnostics-extension
 */

import {
  TelemetryInfoUnion,
  DiagnosticsParams,
  GetAvailableRoutinesResponse,
  GetRoutineUpdateResponse,
  RoutineType,
} from './dpsl';

export const enum RequestType {
  TELEMETRY = 'telemetry',
  DIAGNOSTICS = 'diagnostics',
  EVENTS = 'events',
}

export const enum TelemetryInfoType {
  BATTERY = 'battery',
  BLOCK_DEVICE = 'block-device',
  CPU = 'cpu',
  MEMORY = 'memory',
  STATEFUL_PARTITION = 'stateful-partition',
  VPD = 'vpd',
}

export const enum ResponseErrorInfoMessage {
  InvalidRequestType = 'Invalid or missing request type.',
  InvalidTelemetryInfoType = 'The requested telemetry infoType is either invalid or missing.',
  InvalidDiagnosticsRoutineStatus = 'The diagnostics routine status is invalid.',
  MissingTelemetryRequest = 'Missing telemetry object in request.',
  MissingDiagnosticsRequest = 'Missing diagnostics object in request.',
  InvalidDiagnosticsAction = 'The requested diagnostics action is either invalid or missing.',
  InvalidDiagnosticsParams = 'The requested diagnostics params are either invalid or missing.',  
  InvalidDiagnosticsRoutineName = 'The requested diagnostics routine name is either invalid or missing.',
  InvalidDiagnosticsRoutineId = 'The requested diagnostics routine id is either invalid or missing.',
  UnsupportedTelemetryFunction = 'Unsupported operation. The requested telemetry function is not supported',
}

export const enum DiagnosticsAction {
  GET_AVAILABLE_ROUTINE = 'get-available-routine',
  RESUME = 'resume',
  START = 'start',
  STATUS = 'status',
  STOP = 'stop',
}

export interface TelemetryRequest {
  infoType: TelemetryInfoType;
}

export interface DiagnosticsRequest {
  action: DiagnosticsAction;
  routineId?: number;
  routineName?: RoutineType;
  params?: DiagnosticsParams;
}

export interface Request {
  type: RequestType;
  telemetry?: TelemetryRequest;
  diagnostics?: DiagnosticsRequest;
}

export interface Error {
  message: String;
}

export interface TelemetryResponse {
  info: TelemetryInfoUnion;
}

export interface RoutineUpdateResponse {
  id: number;
  info: GetRoutineUpdateResponse;
}

export type DiagnosticsResponse =
  | GetAvailableRoutinesResponse
  | RoutineUpdateResponse

export interface Response {
  success: Boolean;
  error?: Error;
  telemetry?: TelemetryResponse;
  diagnostics?: DiagnosticsResponse;
}
