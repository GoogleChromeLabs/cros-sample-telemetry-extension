// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Functions to generate fake diagnostics data.
 */

import {
  DiagnosticsParams,
  RoutineStatus,
  RoutineType,
  RunRoutineResponse,
  GetRoutineUpdateResponse,
  UserMessageType
} from '@common/dpsl';

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000);
};

export const fakeAvailableRoutines = async (): Promise<RoutineType[]> => {
  return [
    RoutineType.ac_power,
    RoutineType.audio_driver,
    RoutineType.battery_capacity,
    RoutineType.battery_charge,
    RoutineType.battery_discharge,
    RoutineType.battery_health,
    RoutineType.bluetooth_discovery,
    RoutineType.bluetooth_pairing,
    RoutineType.bluetooth_power,
    RoutineType.bluetooth_scanning,
    RoutineType.cpu_cache,
    RoutineType.cpu_floating_point_accuracy,
    RoutineType.cpu_prime_search,
    RoutineType.cpu_stress,
    RoutineType.disk_read,
    RoutineType.dns_resolution,
    RoutineType.dns_resolver_present,
    RoutineType.emmc_lifetime,
    RoutineType.fingerprint_alive,
    RoutineType.gateway_can_be_pinged,
    RoutineType.lan_connectivity,
    RoutineType.memory,
    RoutineType.nvme_self_test,
    RoutineType.nvme_wear_level,
    RoutineType.power_button,
    RoutineType.sensitive_sensor,
    RoutineType.signal_strength,
    RoutineType.smartctl_check,
    RoutineType.smartctl_check_with_percentage_used,
    RoutineType.ufs_lifetime,
  ]
}

export const runAcPowerRoutine = async (params: DiagnosticsParams): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runAudioDriverRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBatteryCapacityRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBatteryChargeRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBatteryDischargeRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBatteryHealthRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBluetoothDiscoveryRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBluetoothPairingRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBluetoothPowerRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runBluetoothScanningRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runCpuCacheRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runCpuFloatingPointAccuracyRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runCpuPrimeSearchRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runCpuStressRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runDiskReadRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runDnsResolutionRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runDnsResolverPresentRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runEmmcLifetimeRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runFingerprintAliveRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runGatewayCanBePingedRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runLanConnectivityRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runMemoryRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runNvmeSelfTestRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runNvmeWearLevelRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runPowerButtonRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runSensitiveSensorRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runSignalStrengthRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runSmartctlCheckRoutine = async (params: DiagnosticsParams) : Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export const runUfsLifetimeRoutine = async (): Promise<RunRoutineResponse> => {
  const routineId = generateRandomId();
  let res: RunRoutineResponse = {id: routineId, status: RoutineStatus.unknown };
  return res;
}

export class Routine {
  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  async _genericSendCommand(command: string): Promise<GetRoutineUpdateResponse> {
    const message = {
      routineId: this._id,
      command: command,
      includeOutput: true,
    };
    const status: GetRoutineUpdateResponse = {
      progress_percent: 0,
      output: '',
      status: RoutineStatus.unknown,
      status_message: '',
      user_message: UserMessageType.unknown,
    };
    return status;
  }

  /**
   * Resumes this routine, e.g. when user prompts to run a waiting routine.
   */
  resume(): Promise<GetRoutineUpdateResponse> {
    return this._genericSendCommand('resume');
  }

  /**
   * Stops this routine, if running, or remove otherwise.
   * Note: The routine cannot be restarted again.
   */
  stop(): Promise<GetRoutineUpdateResponse> {
    this._genericSendCommand('cancel');
    return this._genericSendCommand('remove');
  }

  /**
   * Returns current status of this routine.
   */
  getStatus(): Promise<GetRoutineUpdateResponse> {
    return this._genericSendCommand('get-status');
  }
}