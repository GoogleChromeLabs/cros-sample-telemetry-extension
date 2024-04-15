// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview chrome.os.telemetry* types definitions.
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
export enum CpuArchitectureEnum {
  unknown = 'unknown',
  x86_64 = 'x86_64',
  aarch64 = 'aarch64',
  armv7l = 'armv7l',
}

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
export enum DisplayInputType {
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
export enum NetworkType {
  cellular = 'cellular',
  ethernet = 'ethernet',
  tether = 'tether',
  vpn = 'vpn',
  wifi = 'wifi',
}

/**
 * Types of network states
 */
export enum NetworkState {
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
export enum FwupdVersionFormat {
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
export enum UsbVersion {
  unknown = 'unknown',
  usb1 = 'usb1',
  usb2 = 'usb2',
  usb3 = 'usb3',
}

/**
 * Types of USB spec speeds in Mbps
 */
export enum UsbSpecSpeed {
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
export enum TpmGSCVersion {
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
