/**
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {
  AudioJackEventInfo,
  EventCategory,
  EventSupportStatusInfo,
  ExternalDisplayEventInfo,
  KeyboardDiagnosticEventInfo,
  LidEventInfo,
  PowerEventInfo,
  SdCardEventInfo,
  StylusConnectedEventInfo,
  StylusGarageEventInfo,
  StylusTouchEventInfo,
  TouchpadButtonEventInfo,
  TouchpadConnectedEventInfo,
  TouchpadTouchEventInfo,
  TouchscreenConnectedEventInfo,
  TouchscreenTouchEventInfo,
  UsbEventInfo,
} from './telemetry-extension-types/events';
import {
  GetAvailableRoutinesResponse,
  GetRoutineUpdateResponse,
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
} from './telemetry-extension-types/legacy-diagnostics';
import {
  CancelRoutineRequest,
  CreateRoutineArgumentsUnion,
  CreateRoutineResponse,
  RoutineFinishedInfo,
  RoutineInitializedInfo,
  RoutineRunningInfo,
  RoutineSupportStatusInfo,
  RoutineWaitingInfo,
  StartRoutineRequest,
} from './telemetry-extension-types/routines';
import {
  AudioInfo,
  BatteryInfo,
  CpuInfo,
  DisplayInfo,
  InternetConnectivityInfo,
  MarketingInfo,
  MemoryInfo,
  NonRemovableBlockDeviceInfoResponse,
  OemData,
  OsVersionInfo,
  StatefulPartitionInfo,
  TpmInfo,
  UsbBusDevices,
  VpdInfo,
} from './telemetry-extension-types/telemetry';

/**
 * @fileoverview Types regarding communication between
 * diagostics-app and diagnostics-extension
 */

export enum RequestType {
  TELEMETRY = 'telemetry',
  DIAGNOSTICS = 'diagnostics',
  EVENTS = 'events',
  ROUTINE_V2 = 'routine-v2',
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
  INVALID_REQUEST_TYPE = 'Invalid or missing request type.',
  INVALID_TELEMETRY_INFO_TYPE = 'The requested telemetry infoType is either invalid or missing.',
  INVALID_DIAGNOSTICS_ROUTINE_STATUS = 'The diagnostics routine status is invalid.',
  MISSING_TELEMETRY_REQUEST = 'Missing telemetry object in request.',
  MISSING_DIAGNOSTICS_REQUEST = 'Missing diagnostics object in request.',
  MISSING_EVENTS_REQUEST = 'Missing events object in request.',
  INVALID_DIAGNOSTICS_ACTION = 'The requested diagnostics action is either invalid or missing.',
  INVALID_DIAGNOSTICS_PARAMS = 'The requested diagnostics params are either invalid or missing.',
  INVALID_DIAGNOSTICS_ROUTINE_NAME = 'The requested diagnostics routine name is either invalid or missing.',
  INVALID_DIAGNOSTICS_ROUTINE_INFO = 'The requested diagnostics routine info is either invalid or missing.',
  INVALID_DIAGNOSTICS_ROUTINE_ID = 'The requested diagnostics routine id is either invalid or missing.',
  INVALID_EVENTS_ACTION = 'The requested events action is either invalid or missing.',
  INVALID_EVENTS_GET_SUBJECT = 'The requested events category is invalid.',
  INVALID_PORT_NAME = 'The connection port name is either invalid or missing.',
  UNSUPPORTED_TELEMETRY_FUNCTION = 'Unsupported operation. The requested telemetry function is not supported',
  MISSING_EVENTS_TYPE_SUBJECT = 'Missing the subject for sending the event info from events service',
  FAILED_PORT_CONNECTION_SERVICE_CONSTRUCTOR = 'Error when establishing connection and add listener with extension.',
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
  ROUTINE_V2_PORT = 'routine-v2-port',
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
  routineV2?: RoutineV2Request;
}

export interface Error {
  message: string;
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
  routineV2?: RoutineV2Response;
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

export type RoutineV2Request =
  | StartRoutineMessage
  | CancelRoutineMessage
  | CreateRoutineMessage
  | IsRoutineArgumentSupportedMessage;

export interface StartRoutineMessage {
  type: RoutineV2Action.START_ROUTINE;
  request: StartRoutineRequest;
}

export interface CancelRoutineMessage {
  type: RoutineV2Action.CANCEL_ROUTINE;
  request: CancelRoutineRequest;
}

export interface IsRoutineArgumentSupportedMessage {
  type: RoutineV2Action.IS_ROUTINE_ARGUMENT_SUPPORTED;
  request: CreateRoutineArgumentsUnion;
}

export interface CreateRoutineMessage {
  type: RoutineV2Action.CREATE_ROUTINE;
  request: CreateRoutineArgumentsUnion;
}

export enum RoutineV2Action {
  IS_ROUTINE_ARGUMENT_SUPPORTED = 'is-routine-argument-supported',
  CREATE_ROUTINE = 'create-routine',
  START_ROUTINE = 'start-routine',
  CANCEL_ROUTINE = 'cancel-routine',
}

// This enum should correspond to the name of fields used in passing around
// various routines.
export enum RoutineV2Category {
  FAN = 'fan',
  MEMORY = 'memory',
  NETWORK_BANDWIDTH = 'networkBandwidth',
  VOLUME_BUTTON = 'volumeButton',
}

export type RoutineV2Response =
  | CreateRoutineResponse
  | RoutineSupportStatusInfo
  | null;

export function IsRoutineSupportStatusInfo(
  response: RoutineV2Response,
): response is RoutineSupportStatusInfo {
  return (response as RoutineSupportStatusInfo).status !== undefined;
}

export function IsCreateRoutineResponse(
  response: RoutineV2Response,
): response is CreateRoutineResponse {
  return (response as CreateRoutineResponse).uuid !== undefined;
}

export type RoutineV2EventUnion =
  | RoutineInitializedInfo
  | RoutineRunningInfo
  | RoutineWaitingInfo
  | RoutineFinishedInfo;

export enum RoutineV2EventCategory {
  INITIALIZED = 'initialized',
  RUNNING = 'running',
  WAITING = 'waiting',
  EXCEPTION = 'exception',
  FINISHED = 'finished',
}

export interface RoutineV2Event {
  eventCategory: RoutineV2EventCategory;
  event: RoutineV2EventUnion;
}
