/**
 * @fileoverview chrome.os.diagnostics* types definitions, only for diagnostics
 * v1 API.
 */

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
