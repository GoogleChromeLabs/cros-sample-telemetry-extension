// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {
  AudioInfo,
  AudioJackEventInfo,
  BatteryInfo,
  CancelRoutineRequest,
  CpuInfo,
  CreateRoutineResponse,
  DisplayInfo,
  EventCategory,
  EventSupportStatusInfo,
  ExternalDisplayEventInfo,
  FanRoutineFinishedInfo,
  GetAvailableRoutinesResponse,
  GetRoutineUpdateResponse,
  InternetConnectivityInfo,
  KeyboardDiagnosticEventInfo,
  LidEventInfo,
  MarketingInfo,
  MemoryInfo,
  MemoryRoutineFinishedInfo,
  NonRemovableBlockDeviceInfoResponse,
  OemData,
  OsVersionInfo,
  PowerEventInfo,
  RoutineInitializedInfo,
  RoutineRunningInfo,
  RoutineSupportStatusInfo,
  RoutineType,
  RoutineWaitingInfo,
  RunAcPowerRoutineRequest,
  RunBatteryChargeRoutineRequest,
  RunBatteryDischargeRoutineRequest,
  RunBluetoothPairingRoutineRequest,
  RunBluetoothScanningRoutineRequest,
  RunCpuRoutineRequest,
  RunDiskReadRequest,
  RunFanRoutineArguments,
  RunMemoryRoutineArguments,
  RunNvmeSelfTestRequest,
  RunNvmeWearLevelRequest,
  RunPowerButtonRequest,
  RunSmartctlCheckRequest,
  RunVolumeButtonRoutineArguments,
  SdCardEventInfo,
  StartRoutineRequest,
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
  VolumeButtonRoutineFinishedInfo,
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
  FailedPortConnectionServiceConstructor = 'Error when establishing connection and add listener with extension.',
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
  request: RoutineV2Argument;
}

export interface CreateRoutineMessage {
  type: RoutineV2Action.CREATE_ROUTINE;
  request: RoutineV2Argument;
}

export enum RoutineV2Action {
  IS_ROUTINE_ARGUMENT_SUPPORTED = 'is-routine-argument-supported',
  CREATE_ROUTINE = 'create-routine',
  START_ROUTINE = 'start-routine',
  CANCEL_ROUTINE = 'cancel-routine',
}

export enum RoutineV2Category {
  fan = 'fan',
  memory = 'memory',
  volumeButton = 'volume-button',
}

export interface RoutineV2Argument {
  category: RoutineV2Category;
  argument: RoutineV2ArgumentUnion;
}

export type RoutineV2ArgumentUnion =
  | RunFanRoutineArguments
  | RunMemoryRoutineArguments
  | RunVolumeButtonRoutineArguments;

export type RoutineV2FinishedInfoUnion =
  | FanRoutineFinishedInfo
  | MemoryRoutineFinishedInfo
  | VolumeButtonRoutineFinishedInfo;

export type RoutineV2Response =
  | CreateRoutineResponse
  | RoutineSupportStatusInfo;

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
  | FanRoutineFinishedInfo
  | MemoryRoutineFinishedInfo
  | VolumeButtonRoutineFinishedInfo;

export enum RoutineV2EventCategory {
  initialized = 'initialized',
  running = 'running',
  waiting = 'waiting',
  exception = 'exception',
  fanFinished = 'fan-finished',
  memoryFinished = 'memory-finished',
  volumeButtonFinished = 'volume-button-finished',
}

export interface RoutineV2Event {
  eventCategory: RoutineV2EventCategory;
  event: RoutineV2EventUnion;
}
