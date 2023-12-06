// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {
  AudioInfo,
  AudioJackEventInfo,
  BatteryInfo,
  CpuInfo,
  DisplayInfo,
  EventCategory,
  EventSupportStatusInfo,
  ExternalDisplayEventInfo,
  GetAvailableRoutinesResponse,
  GetRoutineUpdateResponse,
  InternetConnectivityInfo,
  KeyboardDiagnosticEventInfo,
  LidEventInfo,
  MarketingInfo,
  MemoryInfo,
  NonRemovableBlockDeviceInfoResponse,
  OemData,
  OsVersionInfo,
  PowerEventInfo,
  RoutineType,
  RunAcPowerRoutineRequest,
  RunBatteryChargeRoutineRequest,
  RunBatteryDischargeRoutineRequest,
  RunBluetoothPairingRoutineRequest,
  RunBluetoothScanningRoutineRequest,
  RunCpuRoutineRequest,
  RunDiskReadRequest,
  RunNvmeSelfTestRequest,
  RunNvmeWearLevelRequest,
  RunPowerButtonRequest,
  RunSmartctlCheckRequest,
  SdCardEventInfo,
  StatefulPartitionInfo,
  StylusConnectedEventInfo,
  StylusGarageEventInfo,
  StylusTouchEventInfo,
  TouchpadButtonEventInfo,
  TouchpadConnectedEventInfo,
  TouchpadTouchEventInfo,
  TouchscreenConnectedEventInfo,
  TouchscreenTouchEventInfo,
  TpmInfo,
  UsbBusDevices,
  UsbEventInfo,
  VpdInfo,
} from './telemetry-extension-types';

/**
 * @fileoverview Types regarding communication between
 * diagostics-app and diagnostics-extension
 */

export enum RequestType {
  TELEMETRY = 'telemetry',
  DIAGNOSTICS = 'diagnostics',
  EVENTS = 'events',
}

export enum TelemetryInfoType {
  AUDIO = 'audio',
  BATTERY = 'battery',
  BLOCK_DEVICE = 'block_device',
  CPU = 'cpu',
  DISPLAY = 'display',
  MARKETING = 'marketing',
  MEMORY = 'memory',
  NETWORK = 'network',
  OEM = 'oem',
  OS_VERSION = 'os_version',
  USB = 'usb',
  VPD = 'vpd',
  STATEFUL_PARTITION = 'stateful_partition',
  TPM = 'tpm',
}

export enum ResponseErrorInfoMessage {
  InvalidRequestType = 'Invalid or missing request type.',
  InvalidTelemetryInfoType = 'The requested telemetry infoType is either invalid or missing.',
  InvalidDiagnosticsRoutineStatus = 'The diagnostics routine status is invalid.',
  MissingTelemetryRequest = 'Missing telemetry object in request.',
  MissingDiagnosticsRequest = 'Missing diagnostics object in request.',
  MissingEventsRequest = 'Missing events object in request.',
  InvalidDiagnosticsAction = 'The requested diagnostics action is either invalid or missing.',
  InvalidDiagnosticsParams = 'The requested diagnostics params are either invalid or missing.',
  InvalidDiagnosticsRoutineName = 'The requested diagnostics routine name is either invalid or missing.',
  InvalidDiagnosticsRoutineInfo = 'The requested diagnostics routine info is either invalid or missing.',
  InvalidDiagnosticsRoutineId = 'The requested diagnostics routine id is either invalid or missing.',
  InvalidEventsAction = 'The requested events action is either invalid or missing.',
  InvalidEventsGetSubject = 'The requested events category is invalid.',
  InvalidPortName = 'The connection port name is either invalid or missing.',
  UnsupportedTelemetryFunction = 'Unsupported operation. The requested telemetry function is not supported',
  MissingEventsTypeSubject = 'Missing the subject for sending the event info from events service',
  FailedEventsServiceConstructor = 'Error when establishing connection and add listener with extension.',
}

export enum DiagnosticsAction {
  GET_AVAILABLE_ROUTINE = 'get-available-routine',
  RESUME = 'resume',
  START = 'start',
  STATUS = 'status',
  STOP = 'stop',
}

export enum EventsAction {
  IS_EVENT_SUPPORTED = 'is-event-supported',
  START_CAPTURING_EVENT = 'start-capturing-event',
  STOP_CAPTURING_EVENT = 'stop-capturing-event',
}

export enum PortName {
  EVENTS_PORT = 'events-port',
}

export interface TelemetryRequest {
  infoType: TelemetryInfoType;
}

export interface DiagnosticsRequest {
  action: DiagnosticsAction;
  routineId?: number;
  routineName?: RoutineType;
  params?: DiagnosticsParamsUnion;
}

export interface EventsRequest {
  action: EventsAction;
  eventType: EventCategory;
}

export interface Request {
  type: RequestType;
  telemetry?: TelemetryRequest;
  diagnostics?: DiagnosticsRequest;
  events?: EventsRequest;
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

export type EventsResponse = EventSupportStatusInfo;

export interface EventMessage {
  type: EventCategory;
  info: EventsInfoUnion;
}

export type DiagnosticsResponse =
  | GetAvailableRoutinesResponse
  | RoutineUpdateResponse;

export interface Response {
  success: Boolean;
  error?: Error;
  telemetry?: TelemetryResponse;
  diagnostics?: DiagnosticsResponse;
  events?: EventsResponse;
}

export type TelemetryInfoUnion =
  | AudioInfo
  | BatteryInfo
  | NonRemovableBlockDeviceInfoResponse
  | CpuInfo
  | DisplayInfo
  | MarketingInfo
  | MemoryInfo
  | InternetConnectivityInfo
  | OemData
  | OsVersionInfo
  | UsbBusDevices
  | VpdInfo
  | StatefulPartitionInfo
  | TpmInfo;

export type DiagnosticsParamsUnion =
  | RunAcPowerRoutineRequest
  | RunBatteryChargeRoutineRequest
  | RunBatteryDischargeRoutineRequest
  | RunBluetoothPairingRoutineRequest
  | RunBluetoothScanningRoutineRequest
  | RunCpuRoutineRequest
  | RunDiskReadRequest
  | RunNvmeWearLevelRequest
  | RunNvmeSelfTestRequest
  | RunPowerButtonRequest
  | RunSmartctlCheckRequest;

export type EventsInfoUnion =
  | KeyboardDiagnosticEventInfo
  | AudioJackEventInfo
  | LidEventInfo
  | UsbEventInfo
  | ExternalDisplayEventInfo
  | SdCardEventInfo
  | PowerEventInfo
  | StylusGarageEventInfo
  | TouchpadButtonEventInfo
  | TouchpadTouchEventInfo
  | TouchpadConnectedEventInfo
  | TouchscreenTouchEventInfo
  | TouchscreenConnectedEventInfo
  | StylusTouchEventInfo
  | StylusConnectedEventInfo;
