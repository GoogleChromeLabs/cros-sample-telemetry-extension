// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview chrome.os.* types definitions.
 */

/**
 * Information about an Audio input node
 */
export interface AudioInputNodeInfo {
  id?: number;
  name?: string;
  deviceName?: string;
  active?: boolean;
  nodeGain?: number;
}

/**
 * Information about an Audio output node
 */
export interface AudioOutputNodeInfo {
  id?: number;
  name?: string;
  deviceName?: string;
  active?: boolean;
  nodeVolume?: number;
}

/**
 * Response message containing Audio Info
 */
export interface AudioInfo {
  outputMute?: boolean;
  inputMute?: boolean;
  underruns?: number;
  severeUnderruns?: number;
  outputNodes: AudioOutputNodeInfo[];
  inputNodes: AudioInputNodeInfo[];
}

/**
 * Response message containing Battery Info
 */
export interface BatteryInfo {
  cycleCount?: number;
  voltageNow?: number;
  vendor?: string;
  serialNumber?: string;
  chargeFullDesign?: number;
  chargeFull?: number;
  voltageMinDesign?: number;
  modelName?: string;
  chargeNow?: number;
  currentNow?: number;
  technology?: string;
  status?: string;
  manufactureDate?: string;
  temperature?: number;
}

/**
 * Information about a Non Removable Block Device
 */
export interface NonRemovableBlockDeviceInfo {
  name?: string;
  type?: string;
  size?: number;
}

/**
 * Response message containing Non Removable Block Device Info
 */
export type NonRemovableBlockDeviceInfoResponse = NonRemovableBlockDeviceInfo[];

/**
 * Types of CPU architectures
 */
export const enum CpuArchitectureEnum {
  unknown = 'unknown',
  x86_64 = 'x86_64',
  aarch64 = 'aarch64',
  armv7l = 'armv7l',
};

/**
 * Information about a CPU's C-states
 */
export interface CpuCStateInfo {
  name?: string;
  timeInStateSinceLastBootUs?: number;
}

/**
 * Information about a particular logical CPU
 */
export interface LogicalCpuInfo {
  maxClockSpeedKhz?: number;
  scalingMaxFrequencyKhz?: number;
  scalingCurrentFrequencyKhz?: number;
  idleTimeMs?: number;
  cStates: CpuCStateInfo[];
  coreId?: number;
}

/**
 * Information about a particular physical CPU
 */
export interface PhysicalCpuInfo {
  modelName?: string;
  logicalCpus: LogicalCpuInfo[];
}

/**
 * Response message containing CPU Info
 */
export interface CpuInfo {
  numTotalThreads?: number;
  architecture: CpuArchitectureEnum;
  physicalCpus: PhysicalCpuInfo[];
}

/**
 * Types of display inputs
 */
export const enum DisplayInputType {
  unknown = 'unknown',
  digital = 'digital',
  analog = 'analog',
}

/**
 * Information about an embedded display
 */
export interface EmbeddedDisplayInfo {
  privacyScreenSupported?: boolean;
  privacyScreenEnabled?: boolean;
  displayWidth?: number;
  displayHeight?: number;
  resolutionHorizontal?: number;
  resolutionVertical?: number;
  refreshRate?: number;
  manufacturer?: string;
  modelId?: number;
  serialNumber?: number;
  manufactureWeek?: number;
  manufactureYear?: number;
  edidVersion?: string;
  inputType: DisplayInputType;
  displayName?: string;
}

/**
 * Information about a external display
 */
export interface ExternalDisplayInfo {
  displayWidth?: number;
  displayHeight?: number;
  resolutionHorizontal?: number;
  resolutionVertical?: number;
  refreshRate?: number;
  manufacturer?: string;
  modelId?: number;
  serialNumber?: number;
  manufactureWeek?: number;
  manufactureYear?: number;
  edidVersion?: string;
  inputType: DisplayInputType;
  displayName?: string;
}

/**
 * Response message containing Display Info
 */
export interface DisplayInfo {
  embeddedDisplay: EmbeddedDisplayInfo;
  externalDisplays: ExternalDisplayInfo[];
}

/**
 * Response message containing Marketing Info
 */
export interface MarketingInfo {
  marketingName?: string;
}

/**
 * Response message containing Memory Info
 */
export interface MemoryInfo {
  totalMemoryKiB?: number;
  freeMemoryKiB?: number;
  availableMemoryKiB?: number;
  pageFaultsSinceLastBoot?: string;
}

/**
 * Types of networks
 */
export const enum NetworkType {
  cellular = 'cellular',
  ethernet = 'ethernet',
  tether = 'tether',
  vpn = 'vpn',
  wifi = 'wifi',
}

/**
 * Types of network states
 */
export const enum NetworkState {
  uninitialized = 'uninitialized',
  disabled = 'disabled',
  prohibited = 'prohibited',
  not_connected = 'not_connected',
  connecting = 'connecting',
  portal = 'portal',
  connected = 'connected',
  online = 'online',
}

/**
 * Information about a network
 */
export interface NetworkInfo {
  type?: NetworkType;
  state?: NetworkState;
  macAddress?: string;
  ipv6Addresses: string[];
  signalStrength?: number;
}

/**
 * Response message containing Interrnet connectivity Info
 */
export interface InternetConnectivityInfo {
  networks: NetworkInfo[];
}

/**
 * Response message containing OEM data Info
 */
export interface OemData {
  oemData: string;
}

/**
 * Response message containing OS version Info
 */
export interface OsVersionInfo {
  releaseMilestone?: string;
  buildNumber?: string;
  patchNumber?: string;
  releaseChannel?: string;
}

/**
 * Information about an usb bus interface
 */
export interface UsbBusInterfaceInfo {
  interfaceNumber?: number;
  classId?: number;
  subclassId?: number;
  protocolId?: number;
  driver?: string;
}

/**
 * Types of the formats of firmware version in fwpud
 */
export const enum FwupdVersionFormat {
  plain = 'plain',
  number = 'number',
  pair = 'pair',
  triplet = 'triplet',
  quad = 'quad',
  bcd = 'bcd',
  intelMe = 'intelMe',
  intelMe2 = 'intelMe2',
  surfaceLegacy = 'surfaceLegacy',
  surface = 'surface',
  dellBios = 'dellBios',
  hex = 'hex',
}

/**
 * Information about a firmware version obtained from fwupd
 */
export interface FwupdFirmwareVersionInfo {
  version?: string;
  version_format?: FwupdVersionFormat;
}

/**
 * Types of USB versions
 */
export const enum UsbVersion {
  unknown = 'unknown',
  usb1 = 'usb1',
  usb2 = 'usb2',
  usb3 = 'usb3',
}

/**
 * Types of USB spec speeds in Mbps
 */
export const enum UsbSpecSpeed {
  unknown = 'unknown',
  n1_5Mbps = 'n1_5Mbps',
  n12Mbps = 'n12Mbps',
  n480Mbps = 'n480Mbps',
  n5Gbps = 'n5Gbps',
  n10Gbps = 'n10Gbps',
  n20Gbps = 'n20Gbps',
}

/**
 * Information about an USB
 */
export interface UsbBusInfo {
  classId?: number;
  subclassId?: number;
  protocolId?: number;
  vendorId?: number;
  productId?: number;
  interfaces: UsbBusInterfaceInfo[];
  fwupdFirmwareVersionInfo?: FwupdFirmwareVersionInfo;
  version?: UsbVersion;
  spec_speed?: UsbSpecSpeed;
}

/**
 * Response message containing USB bus devices Info
 */
export interface UsbBusDevices {
  devices: UsbBusInfo[];
}

/**
 * Response message containing VPD Info
 */
export interface VpdInfo {
  activateDate?: string;
  modelName?: string;
  serialNumber?: string;
  skuNumber?: string;
}

/**
 * Response message containing StatefulPartition Info
 */
export interface StatefulPartitionInfo {
  availableSpace?: number;
  totalSpace?: number;
}

/**
 * Types of a TPM GSC versions
 */
export const enum TpmGSCVersion {
  not_gsc = 'not_gsc',
  cr50 = 'cr50',
  ti50 = 'ti50',
}

/**
 * Information about a TPM version
 */
export interface TpmVersion {
  gscVersion?: TpmGSCVersion;
  family?: number;
  specLevel?: number;
  manufacturer?: number;
  tpmModel?: number;
  firmwareVersion?: number;
  vendorSpecific?: string;
}

/**
 * Information about a TPM status
 */
export interface TpmStatus {
  enabled?: boolean;
  owned?: boolean;
  ownerPasswordIsPresent?: boolean;
}

/**
 * Information about a TPM dictionary attack
 */
export interface TpmDictionaryAttack {
  counter?: number;
  threshold?: number;
  lockoutInEffect?: boolean;
  lockoutSecondsRemaining?: number;
}

/**
 * Response message containing TPM Info
 */
export interface TpmInfo {
  version: TpmVersion;
  status: TpmStatus;
  dictionaryAttack: TpmDictionaryAttack;
}

// chrome.os.diagnostics.* type definitions

/**
 * Types of diagnostics routine
 */
export const enum RoutineType {
  available_routines = 'available_routines',
  ac_power = 'ac_power',
  audio_driver = 'audio_driver',
  battery_capacity = 'battery_capacity',
  battery_charge = 'battery_charge',
  battery_discharge = 'battery_discharge',
  battery_health = 'battery_health',
  bluetooth_discovery = 'bluetooth_discovery',
  bluetooth_pairing = 'bluetooth_pairing',
  bluetooth_power = 'bluetooth_power',
  bluetooth_scanning = 'bluetooth_scanning',
  cpu_cache = 'cpu_cache',
  cpu_floating_point_accuracy = 'cpu_floating_point_accuracy',
  cpu_prime_search = 'cpu_prime_search',
  cpu_stress = 'cpu_stress',
  disk_read = 'disk_read',
  dns_resolution = 'dns_resolution',
  dns_resolver_present = 'dns_resolver_present',
  emmc_lifetime = 'emmc_lifetime',
  fingerprint_alive = 'fingerprint_alive',
  gateway_can_be_pinged = 'gateway_can_be_pinged',
  lan_connectivity = 'lan_connectivity',
  memory = 'memory',
  nvme_self_test = 'nvme_self_test',
  nvme_wear_level = 'nvme_wear_level',
  power_button = 'power_button',
  sensitive_sensor = 'sensitive_sensor',
  signal_strength = 'signal_strength',
  smartctl_check = 'smartctl_check',
  smartctl_check_with_percentage_used = 'smartctl_check_with_percentage_used',
  ufs_lifetime = 'ufs_lifetime',
}

/**
 * Response of chrome.os.diagnostics.getAvailableRoutines()
 */
export interface GetAvailableRoutinesResponse {
  routines: RoutineType[];
}

/**
 * Types of diagnostics routine status
 */
export const enum RoutineStatus {
  unknown = 'unknown',
  ready = 'ready',
  running = 'running',
  waiting_user_action = 'waiting_user_action',
  passed = 'passed',
  failed = 'failed',
  error = 'error',
  cancelled = 'cancelled',
  failed_to_start = 'failed_to_start',
  removed = 'removed',
  cancelling = 'cancelling',
  unsupported = 'unsupported',
  not_run = 'not_run',
}

/**
 * Response of chrome.os.diagnostics.run*()
 */
export interface RunRoutineResponse {
  id: number,
  status: RoutineStatus,
}

/**
 * Types of routine command types
 */
export const enum RoutineCommandType {
  cancel = 'cancel',
  remove = 'remove',
  resume = 'resume',
  status = 'status',
}

/**
 * Types of messages sent to user
 */
export const enum UserMessageType {
  unknown = 'unknown',
  unplug_ac_power = 'unplug_ac_power',
  plug_in_ac_power = "plug_in_ac_power",
  press_power_button = 'press_power_button',
}

/**
 * |id| Id of the routine you want to query
 * |command| Optional debug output
 */
export interface GetRoutineUpdateRequest {
  id: number;
  command: RoutineCommandType;
}

/**
 * |progress_percent| Current progress of the routine
 * |output| Optional debug output
 * |status| Current routine status
 * |status_message| Optional routine status message
 * |user_message| Returned for routines that require user action
 * (e.g. unplug power cable)
 */
export interface GetRoutineUpdateResponse {
  progress_percent: number;
  output?: string;
  status: RoutineStatus;
  status_message: string;
  user_message?: UserMessageType;
}

/**
 * Types of Ac power status
 */
export const enum AcPowerStatus {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Params object of chrome.os.diagnostics.runAcPowerRoutine()
 */
export interface RunAcPowerRoutineRequest {
  expected_status: AcPowerStatus;
  expected_power_type?: string;
}

/**
 * Params object of chrome.os.diagnostics.runBatteryChargeRoutine()
 */
export interface RunBatteryChargeRoutineRequest {
  length_seconds: number;
  minimum_charge_percent_required: number;
}

/**
 * Params object of chrome.os.diagnostics.runBatteryDischargeRoutine()
 */
export interface RunBatteryDischargeRoutineRequest {
  length_seconds: number;
  maximum_discharge_percent_allowed: number;
}

/**
 * Params object of chrome.os.diagnostics.runBluetoothPairingRoutine()
 */
export interface RunBluetoothPairingRoutineRequest {
  peripheral_id: string;
}

/**
 * Params object of chrome.os.diagnostics.runBluetoothScanningRoutine()
 */
export interface RunBluetoothScanningRoutineRequest {
  length_seconds: number;
}

/**
 * Params object of chrome.os.diagnostics.{runCpuCacheRoutine(), runCpuFloatingPointAccuracyRoutine(),
 * runCpuPrimeSearchRoutine(), runCpuStressRoutine()}
 */
export interface RunCpuRoutineRequest {
  length_seconds: number;
}

/**
 * Types of disk read routine types
 */
export const enum DiskReadRoutineType {
  linear = 'linear',
  random = 'random',
};

/**
 * Params object of chrome.os.diagnostics.runDiskReadRoutine()
 */
export interface RunDiskReadRequest {
  type: DiskReadRoutineType;
  length_seconds: number;
  file_size_mb: number;
}

/**
 * Types of nvme self test types
 */
export const enum NvmeSelfTestType {
  short_test = 'short_test',
  long_test = 'long_test',
};

/**
 * Params object of chrome.os.diagnostics.runNvmeSelfTestRoutine()
 */
export interface RunNvmeSelfTestRequest {
  test_type: NvmeSelfTestType	;
}

/**
 * Params object of chrome.os.diagnostics.runNvmeWearLevelRoutine()
 */
export interface RunNvmeWearLevelRequest {
  wear_level_threshold: number;
}

/**
 * Params object of chrome.os.diagnostics.runPowerButtonRoutine()
 */
export interface RunPowerButtonRequest {
  timeout_seconds: number;
}

/**
 * Params object of chrome.os.diagnostics.runSmartctlCheckRoutine()
 */
export interface RunSmartctlCheckRequest {
  percentage_used_threshold?: number;
}

/**
 * States of a diagnostics card used for setting UI
 */
export const enum DiagnosticsCardState {
  READY = 'ready',
  RUNNING = 'running',
  WAITING_FOR_USER_ACTION = 'waiting_for_user_action',
}

/**
 * An array that contains all diagnostics routines that require user action
 */
export const RESUMABLE_ROUTINES = [
  RoutineType.ac_power,
  RoutineType.battery_charge,
  RoutineType.battery_discharge,
]

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
  | TpmInfo

export type DiagnosticsParams =
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
  | RunSmartctlCheckRequest
