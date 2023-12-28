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

// `chrome.os.diagnostics.*` type definitions.

/**
 * Types of diagnostics routine
 */
export enum RoutineType {
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
export enum RoutineStatus {
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
  id: number;
  status: RoutineStatus;
}

/**
 * Types of routine command types
 */
export enum RoutineCommandType {
  cancel = 'cancel',
  remove = 'remove',
  resume = 'resume',
  status = 'status',
}

/**
 * Types of messages sent to user
 */
export enum UserMessageType {
  unknown = 'unknown',
  unplug_ac_power = 'unplug_ac_power',
  plug_in_ac_power = 'plug_in_ac_power',
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
export enum AcPowerStatus {
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
export enum DiskReadRoutineType {
  linear = 'linear',
  random = 'random',
}

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
export enum NvmeSelfTestType {
  short_test = 'short_test',
  long_test = 'long_test',
}

/**
 * Params object of chrome.os.diagnostics.runNvmeSelfTestRoutine()
 */
export interface RunNvmeSelfTestRequest {
  test_type: NvmeSelfTestType;
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

// `chrome.os.events.*` type definitions.

/**
 * Types of event categories
 */
export enum EventCategory {
  audio_jack = 'audio_jack',
  external_display = 'external_display',
  keyboard_diagnostic = 'keyboard_diagnostic',
  lid = 'lid',
  sd_card = 'sd_card',
  stylus_connected = 'stylus_connected',
  stylus_garage = 'stylus_garage',
  stylus_touch = 'stylus_touch',
  touchpad_button = 'touchpad_button',
  touchpad_connected = 'touchpad_connected',
  touchpad_touch = 'touchpad_touch',
  touchscreen_connected = 'touchscreen_connected',
  touchscreen_touch = 'touchscreen_touch',
  usb = 'usb',
  power = 'power',
}

/**
 * Types of event support status
 */
export enum EventSupportStatus {
  supported = 'supported',
  unsupported = 'unsupported',
}

/**
 * Response of chrome.os.events.isEventSupported(<EventCategory>)
 */
export interface EventSupportStatusInfo {
  status?: EventSupportStatus;
}

/**
 * Types of audio jack events
 */
export enum AudioJackEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of audio jack device types
 */
export enum AudioJackDeviceType {
  headphone = 'headphone',
  microphone = 'microphone',
}

/**
 * Types of keyboard connections
 */
export enum KeyboardConnectionType {
  internal = 'internal',
  usb = 'usb',
  bluetooth = 'bluetooth',
  unknown = 'unknown',
}

/**
 * Types of physical keyboard layouts
 */
export enum PhysicalKeyboardLayout {
  unknown = 'unknown',
  chrome_os = 'chrome_os',
}

/**
 * Types of mechanical keyboard layouts
 */
export enum MechanicalKeyboardLayout {
  unknown = 'unknown',
  ansi = 'ansi',
  iso = 'iso',
  jis = 'jis',
}

/**
 * Types of keyboard number pad presence
 */
export enum KeyboardNumberPadPresence {
  unknown = 'unknown',
  present = 'present',
  not_present = 'not_present',
}

/**
 * Types of keyboard top row keys
 */
export enum KeyboardTopRowKey {
  no_key = 'no_key',
  unknown = 'unknown',
  back = 'back',
  forward = 'forward',
  refresh = 'refresh',
  fullscreen = 'fullscreen',
  overview = 'overview',
  screenshot = 'screenshot',
  screen_brightness_down = 'screen_brightness_down',
  screen_brightness_up = 'screen_brightness_up',
  privacy_screen_toggle = 'privacy_screen_toggle',
  microphone_mute = 'microphone_mute',
  volume_mute = 'volume_mute',
  volume_down = 'volume_down',
  volume_up = 'volume_up',
  keyboard_backlight_toggle = 'keyboard_backlight_toggle',
  keyboard_backlight_down = 'keyboard_backlight_down',
  keyboard_backlight_up = 'keyboard_backlight_up',
  next_track = 'next_track',
  previous_track = 'previous_track',
  play_pause = 'play_pause',
  screen_mirror = 'screen_mirror',
  delete = 'delete',
}

/**
 * Types of keyboard top right keys
 */
export enum KeyboardTopRightKey {
  unknown = 'unknown',
  power = 'power',
  lock = 'lock',
  control_panel = 'control_panel',
}

/**
 * Info of keyboard
 */
export interface KeyboardInfo {
  id?: number;
  connectionType?: KeyboardConnectionType;
  name?: string;
  physicalLayout?: PhysicalKeyboardLayout;
  mechanicalLayout?: MechanicalKeyboardLayout;
  regionCode?: string;
  numberPadPresent?: KeyboardNumberPadPresence;
  topRowKeys: KeyboardTopRowKey[];
  topRightKey?: KeyboardTopRightKey;
  hasAssistantKey: boolean;
}

/**
 * Info of keyboard diagnostics event
 */
export interface KeyboardDiagnosticEventInfo {
  keyboardInfo?: KeyboardInfo;
  testedKeys: number[];
  testedTopRowKeys: number[];
}

/**
 * Types of lid events
 */
export enum LidEvent {
  closed = 'closed',
  opened = 'opened',
}

/**
 * Types of usb events
 */
export enum UsbEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of external display events
 */
export enum ExternalDisplayEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of sd card events
 */
export enum SdCardEvent {
  connected = 'connected',
  disconnected = 'disconnected',
}

/**
 * Types of power events
 */
export enum PowerEvent {
  ac_inserted = 'ac_inserted',
  ac_removed = 'ac_removed',
  os_suspend = 'os_suspend',
  os_resume = 'os_resume',
}

/**
 * Types of stylus garage events
 */
export enum StylusGarageEvent {
  inserted = 'inserted',
  removed = 'removed',
}

/**
 * Info of audio jack event
 */
export interface AudioJackEventInfo {
  event?: AudioJackEvent;
  deviceType?: AudioJackDeviceType;
}

/**
 * Info of lid event
 */
export interface LidEventInfo {
  event?: LidEvent;
}

/**
 * Info of usb event
 */
export interface UsbEventInfo {
  vendor?: string;
  name?: string;
  vid?: number;
  pid?: number;
  categories: string[];
  event?: UsbEvent;
}

/**
 * Info of external display
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
 * Info of external display event
 */
export interface ExternalDisplayEventInfo {
  event?: ExternalDisplayEvent;
  display_info?: ExternalDisplayInfo;
}

/**
 * Info of sd card event
 */
export interface SdCardEventInfo {
  event?: SdCardEvent;
}

/**
 * Info of power event
 */
export interface PowerEventInfo {
  event?: PowerEvent;
}

/**
 * Info of stylus garage event
 */
export interface StylusGarageEventInfo {
  event?: StylusGarageEvent;
}

/**
 * Types of input touch buttons
 */
export enum InputTouchButton {
  left = 'left',
  middle = 'middle',
  right = 'right',
}

/**
 * Types of input touch button states
 */
export enum InputTouchButtonState {
  pressed = 'pressed',
  released = 'released',
}

/**
 * Info of touchpad button event
 */
export interface TouchpadButtonEventInfo {
  button?: InputTouchButton;
  state?: InputTouchButtonState;
}

/**
 * Info of touch point
 */
export interface TouchPointInfo {
  trackingId?: number;
  x?: number;
  y?: number;
  pressure?: number;
  touchMajor?: number;
  touchMinor?: number;
}

/**
 * Info of touchpad touch event
 */
export interface TouchpadTouchEventInfo {
  touchPoints: TouchPointInfo[];
}

/**
 * Info of touchpad connected event
 */
export interface TouchpadConnectedEventInfo {
  maxX?: number;
  maxY?: number;
  maxPressure?: number;
  buttons: InputTouchButton[];
}

/**
 * Info of touchscreen touch event
 */
export interface TouchscreenTouchEventInfo {
  touchPoints: TouchPointInfo[];
}

/**
 * Info of touchscreen connected event
 */
export interface TouchscreenConnectedEventInfo {
  maxX?: number;
  maxY?: number;
  maxPressure?: number;
}

/**
 * Info of stylus touch point
 */
export interface StylusTouchPointInfo {
  x?: number;
  y?: number;
  pressure?: number;
}

/**
 * Info of stylus touch point
 */
export interface StylusTouchEventInfo {
  touchPoint?: StylusTouchPointInfo;
}

/**
 * Info of stylus connected event
 */
export interface StylusConnectedEventInfo {
  maxX?: number;
  maxY?: number;
  maxPressure?: number;
}

// Below are definitions for Routine API V2.

export interface RoutineInitializedInfo {
  uuid?: string;
}

export interface RoutineRunningInfo {
  uuid?: string;
  percentage?: number;
}

export enum RoutineWaitingReason {
  waiting_to_be_scheduled = 'waiting_to_be_scheduled',
  waiting_user_input = 'waiting_user_input',
}

export interface RoutineWaitingInfo {
  uuid?: string;
  percentage?: number;
  // Reason why the routine waits.
  reason?: RoutineWaitingReason;
  // Additional information, may be used to pass instruction or explanation.
  message?: string;
}

enum ExceptionReason {
  unknown,
  // Any other exceptions that we don't expect to happen. Clients should
  // simply report the error.
  unexpected,
  // Raises this if clients try to run an unsupported feature. Note that
  // clients should use methods which return `SupportStatus` for
  // support status check.
  unsupported,
  // The corresponding App UI was closed and thus stopped the routine
  // execution.
  app_ui_closed,
}

export interface ExceptionInfo {
  uuid?: string;
  reason: ExceptionReason;
  // A human readable message for debugging. Don't rely on the content because
  // it could change anytime.
  debugMessage?: string;
}

export enum MemtesterTestItemEnum {
  // The memtester test is not recognized.
  unknown = 'unknown',

  // Test that all memory addresses to be tested can be set to itself and its
  // complement.
  stuck_address = 'stuck_address',

  // These tests test different operation of a random int64 with buffer
  // initialized as 0xFFFFFFFF, repeating over 64 bit blocks.
  // Perform AND operation.
  compare_and = 'compare_and',
  // Perform DIV operation.
  compare_div = 'compare_div',
  // Perform MUL operation.
  compare_mul = 'compare_mul',
  // Perform OR operation.
  compare_or = 'compare_or',
  // Perform SUB operation.
  compare_sub = 'compare_sub',
  // Perform XOR operation.
  compare_xor = 'compare_xor',
  // Perform ADD operation.
  sequential_increment = 'sequential_increment',

  // These tests test setting memory regions in a certain pattern, repeating
  // over each 64 bit blocks.
  // Test Pattern: |0*10*| and |1*01*|.
  bit_flip = 'bit_flip',
  // Test Pattern:|0*1010*| and |1*0101*|.
  bit_spread = 'bit_spread',
  // Test Pattern: all 256 possible combinations of a 8 bit block, repeated 8
  // times.
  block_sequential = 'block_sequential',
  // Test Pattern: Alternating 0 and 1.
  checkerboard = 'checkerboard',
  // Test Pattern: Random 64 bits.
  random_value = 'random_value',
  // Test Pattern: all 0s and all 1s.
  solid_bits = 'solid_bits',
  // Test Pattern: |0*10*|.
  walking_ones = 'walking_ones',
  // Test Pattern: |1*01*|.
  walking_zeroes = 'walking_zeroes',

  // These tests test writing random n bit words across the memory regions.
  // Test Pattern: 8 bit random words.
  eight_bit_writes = 'eight_bit_writes',
  // Test Pattern: 16 bit random words.
  sixteen_bit_writes = 'sixteen_bit_writes',
}

export interface MemtesterResult {
  passed_items: MemtesterTestItemEnum[];
  failed_items: MemtesterTestItemEnum[];
}

export interface MemoryRoutineFinishedInfo {
  uuid?: string;
  has_passed?: boolean;
  // Number of bytes tested in the memory routine.
  bytesTested?: number;
  // Contains the memtester test results.
  result?: MemtesterResult;
}

export interface RunMemoryRoutineArguments {
  // An optional field to indicate how much memory should be tested. If the
  // value is null, memory test will run with as much memory as possible.
  maxTestingMemKib?: number;
}

export enum VolumeButtonType {
  // The volume up button.
  volume_up = 'volume_up',
  // The volume down button.
  volume_down = 'volume_down',
}

export interface VolumeButtonRoutineFinishedInfo {
  uuid?: string;
  has_passed?: boolean;
}

export interface RunVolumeButtonRoutineArguments {
  // The volume button to be tested.
  button_type: VolumeButtonType;
  // Length of time to listen to the volume button events. The value should be
  // positive and less or equal to 600 seconds.
  timeout_seconds: number;
}

export enum HardwarePresenceStatus {
  // The hardware presence matches the description.
  matched = 'matched',
  // The hardware presence does not match the description.
  not_matched = 'not_matched',
  // There is no description available, skipping check.
  not_configured = 'not_configured',
}

export interface FanRoutineFinishedInfo {
  uuid?: string;
  has_passed?: boolean;
  // The ids of fans that can be controlled.
  passed_fan_ids?: number[];
  // The ids of fans that cannot be controlled.
  failed_fan_ids?: number[];
  // Whether the number of fan probed is matched.
  fan_count_status?: HardwarePresenceStatus;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RunFanRoutineArguments {}

export interface CreateRoutineResponse {
  uuid?: string;
}

export enum RoutineSupportStatus {
  supported = 'supported',
  unsupported = 'unsupported',
}

export interface RoutineSupportStatusInfo {
  status?: RoutineSupportStatus;
}

export interface StartRoutineRequest {
  uuid: string;
}

export interface CancelRoutineRequest {
  uuid: string;
}
