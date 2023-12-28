// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Functions to generate fake diagnostics data.
 */

// Fake data may not use certain parameter variables.
/* eslint-disable @typescript-eslint/no-unused-vars */

// Telemetry extension API types may not be camelCase.
/* eslint-disable camelcase */

import {DiagnosticsParamsUnion} from '../common/message';
import {
  GetAvailableRoutinesResponse,
  GetRoutineUpdateResponse,
  RoutineCommandType,
  RoutineStatus,
  RoutineType,
  RunRoutineResponse,
  UserMessageType,
} from '../common/telemetry-extension-types';

let idCount = 0;

const generateRoutineId = () => {
  return idCount++;
};

export const fakeAvailableRoutines =
  async (): Promise<GetAvailableRoutinesResponse> => {
    return {
      routines: [
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
      ],
    };
  };

export const runGenericRoutine = async (
  params?: DiagnosticsParamsUnion,
): Promise<RunRoutineResponse> => {
  const res: RunRoutineResponse = {
    id: generateRoutineId(),
    status: RoutineStatus.ready,
  };
  return res;
};

export abstract class RoutineBase {
  protected _id: number;

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  abstract _sendCommand(
    command: RoutineCommandType,
  ): Promise<GetRoutineUpdateResponse>;

  /**
   * Resumes this routine, e.g. when user prompts to run a waiting routine.
   */
  resume(): Promise<GetRoutineUpdateResponse> {
    return this._sendCommand(RoutineCommandType.resume);
  }

  /**
   * Stops this routine, if running, or remove otherwise.
   * Note: The routine cannot be restarted again.
   */
  stop(): Promise<GetRoutineUpdateResponse> {
    this._sendCommand(RoutineCommandType.cancel);
    return this._sendCommand(RoutineCommandType.remove);
  }

  /**
   * Returns current status of this routine.
   */
  getStatus(): Promise<GetRoutineUpdateResponse> {
    return this._sendCommand(RoutineCommandType.status);
  }
}

// In the generic routine, we increment the percentage after each getStatusRequest.
export class GenericRoutine extends RoutineBase {
  // A counter to record down the number of time routine status is polled.
  private _getStatusCounter: number = 0;
  // How much percentage should increase between each routine status poll.
  private _percentageIncrement: number = 20;

  _sendCommand(command: RoutineCommandType): Promise<GetRoutineUpdateResponse> {
    switch (command) {
      case RoutineCommandType.resume:
        return Promise.reject('No resume expected on generic routine');
      case RoutineCommandType.cancel:
        return Promise.resolve({
          progress_percent: 100,
          output: '',
          status: RoutineStatus.cancelled,
          status_message: '',
          user_message: UserMessageType.unknown,
        });
      case RoutineCommandType.remove:
        return Promise.resolve({
          progress_percent: 100,
          output: '',
          status: RoutineStatus.removed,
          status_message: '',
          user_message: UserMessageType.unknown,
        });
      case RoutineCommandType.status: {
        const percentage = this._getStatusCounter * this._percentageIncrement;
        let status: RoutineStatus;
        if (percentage < 100) {
          this._getStatusCounter += 1;
          status = RoutineStatus.running;
        } else {
          status = RoutineStatus.passed;
        }
        const p = Promise.resolve({
          progress_percent: percentage,
          output: '',
          status: status,
          status_message: '',
          user_message: UserMessageType.unknown,
        });
        return p;
      }
    }
  }
}
