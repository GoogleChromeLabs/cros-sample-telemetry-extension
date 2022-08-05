// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview dpsl.* types definitions.
 */

/**
 * Response message containing Backlight Info
 */
export interface BacklightInfoObject {
  path: string;
  maxBrightness: number;
  brightness: number;
}

/**
 * Response message containing Backlight Info
 */
export type BacklightInfo = BacklightInfoObject[];

/**
 * Response message containing Battery Info
 */
export interface BatteryInfo {
  cycleCount: string;
  voltageNow: number;
  vendor: string;
  serialNumber: string;
  chargeFullDesign: number;
  chargeFull: number;
  voltageMinDesign: number;
  modelName: string;
  chargeNow: number;
  currentNow: number;
  technology: string;
  status: string;
  manufactureDate: string;
  temperature: string;
}

/**
 * Response message containing Bluetooth Info
 */
export interface BluetoothInfoObject {
  name: string;
  address: string;
  powered: boolean;
  numConnectedDevices: number;
}

/**
 * Response message containing Bluetooth Info
 */
export type BluetoothInfo = BluetoothInfoObject[];

/**
 * Response message containing VPD Info
 */
export interface VpdInfo {
  skuNumber: string;
  serialNumber: string;
  modelName: string;
}

/**
 * Information about a CPU's C-states
 */
export interface CpuCStateInfo {
  name?: string;
  timeInStateSinceLastBootUs?: number;
}

/**
 * Information related to a particular logical CPU.
 */
export interface LogicalCpuInfo {
  maxClockSpeedKhz: number;
  scalingMaxFrequencyKhz: number;
  scalingCurrentFrequencyKhz: number;
  idleTimeMs: number;
  acStates: CpuCStateInfo[];
}

/**
 * Information related to a particular physical CPU.
 */
export interface PhysicalCpuInfo {
  modelName: string;
  logicalCpus: LogicalCpuInfo[];
}

/**
 * Response message containing CPU Info
 */
export interface CpuInfo {
  numTotalThreads: number;
  architecture: string;
  physicalCpus: Array<PhysicalCpuInfo>;
}

/**
 * Response message containing individual Fan Info
 */
export interface FanInfoObject {
  speedRpm: number;
}

/**
 * Response message containing individual Fan Info
 */
export type FanInfo = FanInfoObject[];

/**
 * Response message containing Memory Info
 */
export interface MemoryInfo {
  totalMemoryKib: number;
  freeMemoryKib: number;
  availableMemoryKib: number;
  pageFaultsSinceLastBoot: string;
}

/**
 * Response message containing OEM data Info
 */
export interface OemData {
  oemData: string;
}

/**
 * Response message containing BlockDevice Info
 */
export interface BlockDeviceInfoObject {
  path: string;
  size: string;
  type: string;
  manufacturerId: number;
  name: string;
  serial: string;
  bytesReadSinceLastBoot: string;
  bytesWrittenSinceLastBoot: string;
  readTimeSecondsSinceLastBoot: string;
  writeTimeSecondsSinceLastBoot: string;
  ioTimeSecondsSinceLastBoot: string;
  discardTimeSecondsSinceLastBoot: string;
}

/**
 * Response message containing BlockDevice Info
 */
export type BlockDeviceInfo = BlockDeviceInfoObject[];

/**
 * Response message containing StatefulPartition Info
 */
export interface StatefulPartitionInfo {
  availableSpace: string;
  totalSpace: string;
}

/**
 * Response message containing Timezone Info
 */
export interface TimezoneInfo {
  posix: string;
  region: string;
}

// dpsl.diagnostics.* type definitions

/**
 * |progressPercent| percentage of the routine progress.
 * |output| accumulated output, like logs.
 * |status| current status of the routine.
 * |detail| more detailed status message.
 * |userMessage| Request user action. Should be localized and displayed to the
 * user. Note: used in interactive routines only, two possible values are
 * returned: 'unplug-ac-power' or 'plug-in-ac-power'.
 */
export interface RoutineStatus {
  progressPercent: number;
  output: string;
  status: string;
  statusMessage: string;
  userMessage: string;
}

/**
 * Params object of dpsl.diagnostics.battery.runChargeRoutine()
 */
export interface BatteryChargeRoutineParams {
  lengthSeconds: number;
  minimumChargePercentRequired: number;
}

/**
 * Params object of dpsl.diagnostics.battery.runDischargeRoutine()
 */
export interface BatteryDischargeRoutineParams {
  lengthSeconds: number;
  maximumDischargePercentAllowed: number;
}

/**
 * Params object of dpsl.diagnostics.nvme.runWearLevelRoutine()
 */
export interface NvmeWearLevelRoutineParams {
  wearLevelThreshold: number;
}

/**
 * Params object of dpsl.diagnostics.power.{runAcConnectedRoutine(),
 * runAcDisconnectedRoutine()}
 */
export interface PowerAcRoutineParams {
  expectedPowerType: string;
}

/**
 * Params object of dpsl.diagnostics.cpu.{runCacheRoutine(), runStressRoutine(),
 * runFloatingPointAccuracyRoutine()}
 */
export interface CpuRoutineDurationParams {
  duration: number;
}

/**
 * Params object of dpsl.diagnostics.cpu.runPrimeSearchRoutine()
 */
export interface CpuPrimeSearchRoutineParams {
  lengthSeconds: number;
  maximumNumber: number;
}

/**
 * Params object of dpsl.diagnostics.disk.run{Linear/Random}ReadRoutine()
 */
export interface DiskReadRoutineParams {
  lengthSeconds: number;
  fileSizeMB: number;
}

export type DpslTypes =
  | BacklightInfo
  | BatteryInfo
  | BluetoothInfo
  | VpdInfo
  | CpuInfo
  | FanInfo
  | MemoryInfo
  | BlockDeviceInfo
  | StatefulPartitionInfo
  | TimezoneInfo;

export type DiagnosticsParams =
  | BatteryChargeRoutineParams
  | BatteryDischargeRoutineParams
  | NvmeWearLevelRoutineParams
  | PowerAcRoutineParams
  | CpuRoutineDurationParams
  | CpuPrimeSearchRoutineParams
  | DiskReadRoutineParams;
