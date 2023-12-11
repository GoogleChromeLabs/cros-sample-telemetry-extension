// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Classes related to diagnostics
 */

// The API calls to chrome.os* are not defined in the standard chrome type.
// Allow type-casting into any for access.
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  RoutineCommandType,
  RoutineType,
  RunRoutineResponse,
  GetAvailableRoutinesResponse,
  GetRoutineUpdateRequest,
  GetRoutineUpdateResponse,
} from '../common/telemetry-extension-types';
import {
  DiagnosticsParamsUnion,
  ResponseErrorInfoMessage,
} from '../common/message';
import * as fakeDiagnostics from './fake_diagnostics.data';
import {RoutineBase, GenericRoutine} from './fake_diagnostics.data';
import {environment} from '../environments/environment';

/**
 * Abstract class reprensenting the interface of
 * service to run diagnostics routines
 */
export abstract class DiagnosticsService {
  abstract getAvailableRoutines(): Promise<GetAvailableRoutinesResponse>;
  abstract startRoutine(
    name: RoutineType,
    params?: DiagnosticsParamsUnion,
  ): Promise<RunRoutineResponse>;
  abstract stopRoutine(id: number): Promise<GetRoutineUpdateResponse>;
  abstract resumeRoutine(id: number): Promise<GetRoutineUpdateResponse>;
  abstract getRoutineStatus(id: number): Promise<GetRoutineUpdateResponse>;
}

/**
 * Implementation of DiagnosticsService
 * @extends DiagnosticsService
 */
export class DiagnosticsServiceImpl extends DiagnosticsService {
  getAvailableRoutines = async (): Promise<GetAvailableRoutinesResponse> => {
    return (chrome as any).os.diagnostics.getAvailableRoutines();
  };

  startRoutine = async (
    name: RoutineType,
    params?: DiagnosticsParamsUnion,
  ): Promise<RunRoutineResponse> => {
    params && console.log('Recieved params', params);

    switch (name) {
      case RoutineType.ac_power:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else return (chrome as any).os.diagnostics.runAcPowerRoutine(params);
      case RoutineType.audio_driver:
        return (chrome as any).os.diagnostics.runAudioDriverRoutine();
      case RoutineType.battery_capacity:
        return (chrome as any).os.diagnostics.runBatteryCapacityRoutine();
      case RoutineType.battery_charge:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runBatteryChargeRoutine(params);
      case RoutineType.battery_discharge:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runBatteryDischargeRoutine(
            params,
          );
      case RoutineType.battery_health:
        return (chrome as any).os.diagnostics.runBatteryHealthRoutine();
      case RoutineType.bluetooth_discovery:
        return (chrome as any).os.diagnostics.runBluetoothDiscoveryRoutine();
      case RoutineType.bluetooth_pairing:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runBluetoothPairingRoutine(
            params,
          );
      case RoutineType.bluetooth_power:
        return (chrome as any).os.diagnostics.runBluetoothPowerRoutine();
      case RoutineType.bluetooth_scanning:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runBluetoothScanningRoutine(
            params,
          );
      case RoutineType.cpu_cache:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else return (chrome as any).os.diagnostics.runCpuCacheRoutine(params);
      case RoutineType.cpu_floating_point_accuracy:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (
            chrome as any
          ).os.diagnostics.runCpuFloatingPointAccuracyRoutine(params);
      case RoutineType.cpu_prime_search:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runCpuPrimeSearchRoutine(
            params,
          );
      case RoutineType.cpu_stress:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else return (chrome as any).os.diagnostics.runCpuStressRoutine(params);
      case RoutineType.disk_read:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else return (chrome as any).os.diagnostics.runDiskReadRoutine(params);
      case RoutineType.dns_resolution:
        return (chrome as any).os.diagnostics.runDnsResolutionRoutine();
      case RoutineType.dns_resolver_present:
        return (chrome as any).os.diagnostics.runDnsResolverPresentRoutine();
      case RoutineType.emmc_lifetime:
        return (chrome as any).os.diagnostics.runEmmcLifetimeRoutine();
      case RoutineType.fingerprint_alive:
        return (chrome as any).os.diagnostics.runFingerprintAliveRoutine();
      case RoutineType.gateway_can_be_pinged:
        return (chrome as any).os.diagnostics.runGatewayCanBePingedRoutine();
      case RoutineType.lan_connectivity:
        return (chrome as any).os.diagnostics.runLanConnectivityRoutine();
      case RoutineType.memory:
        return (chrome as any).os.diagnostics.runMemoryRoutine();
      case RoutineType.nvme_self_test:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runNvmeSelfTestRoutine(params);
      case RoutineType.nvme_wear_level:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runNvmeWearLevelRoutine(params);
      case RoutineType.power_button:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runPowerButtonRoutine(params);
      case RoutineType.sensitive_sensor:
        return (chrome as any).os.diagnostics.runSensitiveSensorRoutine();
      case RoutineType.signal_strength:
        return (chrome as any).os.diagnostics.runSignalStrengthRoutine();
      case RoutineType.smartctl_check:
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        else
          return (chrome as any).os.diagnostics.runSmartctlCheckRoutine(params);
      case RoutineType.ufs_lifetime:
        return (chrome as any).os.diagnostics.runUfsLifetimeRoutine();
      default:
        return Promise.reject(
          ResponseErrorInfoMessage.InvalidDiagnosticsRoutineName,
        );
    }
  };
  stopRoutine = (id: number): Promise<GetRoutineUpdateResponse> => {
    const cancelReq: GetRoutineUpdateRequest = {
      id,
      command: RoutineCommandType.cancel,
    };
    const removeReq: GetRoutineUpdateRequest = {
      id,
      command: RoutineCommandType.remove,
    };
    (chrome as any).os.diagnostics.getRoutineUpdate(cancelReq);
    return (chrome as any).os.diagnostics.getRoutineUpdate(removeReq);
  };
  resumeRoutine = (id: number): Promise<GetRoutineUpdateResponse> => {
    const req: GetRoutineUpdateRequest = {
      id,
      command: RoutineCommandType.resume,
    };
    return (chrome as any).os.diagnostics.getRoutineUpdate(req);
  };
  getRoutineStatus = (id: number): Promise<GetRoutineUpdateResponse> => {
    const req: GetRoutineUpdateRequest = {
      id,
      command: RoutineCommandType.status,
    };
    return (chrome as any).os.diagnostics.getRoutineUpdate(req);
  };
}

/**
 * Fake implementation of DiagnosticsService
 * @extends DiagnosticsService
 */
export class FakeDiagnosticsService implements DiagnosticsService {
  private _activeRoutines: {[key: number]: RoutineBase} = {};

  private _fetchRoutineById = (id: number) => {
    if (!(id in this._activeRoutines)) {
      throw ResponseErrorInfoMessage.InvalidDiagnosticsRoutineId;
    }
    return this._activeRoutines[id];
  };

  getAvailableRoutines = async (): Promise<GetAvailableRoutinesResponse> => {
    return fakeDiagnostics.fakeAvailableRoutines();
  };

  startRoutine = async (
    name: RoutineType,
    params?: DiagnosticsParamsUnion,
  ): Promise<RunRoutineResponse> => {
    params && console.log('Recieved params', params);

    switch (name) {
      // These routines should have a parameter
      case RoutineType.ac_power:
      case RoutineType.battery_charge:
      case RoutineType.battery_discharge:
      case RoutineType.bluetooth_pairing:
      case RoutineType.bluetooth_scanning:
      case RoutineType.cpu_cache:
      case RoutineType.cpu_floating_point_accuracy:
      case RoutineType.cpu_prime_search:
      case RoutineType.cpu_stress:
      case RoutineType.disk_read:
      case RoutineType.nvme_self_test:
      case RoutineType.nvme_wear_level:
      case RoutineType.power_button:
      case RoutineType.smartctl_check: {
        if (!params)
          return Promise.reject(
            ResponseErrorInfoMessage.InvalidDiagnosticsParams,
          );
        const res: RunRoutineResponse =
          await fakeDiagnostics.runGenericRoutine(params);
        this._activeRoutines[res.id] = new GenericRoutine(res.id);
        return res;
      }
      case RoutineType.audio_driver:
      case RoutineType.battery_capacity:
      case RoutineType.battery_health:
      case RoutineType.bluetooth_discovery:
      case RoutineType.bluetooth_power:
      case RoutineType.dns_resolution:
      case RoutineType.dns_resolver_present:
      case RoutineType.emmc_lifetime:
      case RoutineType.fingerprint_alive:
      case RoutineType.gateway_can_be_pinged:
      case RoutineType.lan_connectivity:
      case RoutineType.memory:
      case RoutineType.sensitive_sensor:
      case RoutineType.signal_strength:
      case RoutineType.ufs_lifetime: {
        const res: RunRoutineResponse =
          await fakeDiagnostics.runGenericRoutine();
        this._activeRoutines[res.id] = new GenericRoutine(res.id);
        return res;
      }
      default:
        return Promise.reject(
          ResponseErrorInfoMessage.InvalidDiagnosticsRoutineName,
        );
    }
  };

  stopRoutine = (id: number): Promise<GetRoutineUpdateResponse> => {
    const routine = this._fetchRoutineById(id);
    delete this._activeRoutines[id];
    return routine.stop();
  };

  resumeRoutine = (id: number): Promise<GetRoutineUpdateResponse> => {
    const routine = this._fetchRoutineById(id);
    return routine.resume();
  };

  getRoutineStatus = (id: number): Promise<GetRoutineUpdateResponse> => {
    const routine = this._fetchRoutineById(id);
    return routine.getStatus();
  };
}

export class DiagnosticsServiceProvider {
  private static instance: DiagnosticsService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getDiagnosticsService(): DiagnosticsService {
    if (!this.instance) {
      if (environment.testModeEnabled) {
        this.instance = new FakeDiagnosticsService();
      } else {
        this.instance = new DiagnosticsServiceImpl();
      }
    }
    return this.instance;
  }
}
