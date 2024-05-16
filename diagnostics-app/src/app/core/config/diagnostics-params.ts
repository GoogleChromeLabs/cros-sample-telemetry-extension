/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {DiagnosticsParamsUnion} from 'common/message';
import {
  AcPowerStatus,
  DiskReadRoutineType,
  NvmeSelfTestType,
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
} from 'common/telemetry-extension-types/legacy-diagnostics';

// Telemetry extension API types may not be camelCase.
/* eslint-disable camelcase */

const defaultAcPowerRoutineRequest: RunAcPowerRoutineRequest = {
  expected_status: AcPowerStatus.connected,
};

const defaultBatteryChargeRoutineRequest: RunBatteryChargeRoutineRequest = {
  length_seconds: 10,
  minimum_charge_percent_required: 50,
};

const defaultBatteryDischargeRoutineRequest: RunBatteryDischargeRoutineRequest =
  {
    length_seconds: 10,
    maximum_discharge_percent_allowed: 50,
  };

const defaultBluetoothPairingRoutineRequest: RunBluetoothPairingRoutineRequest =
  {
    peripheral_id: 'unknown',
  };
const defaultBluetoothScanningRoutineRequest: RunBluetoothScanningRoutineRequest =
  {
    length_seconds: 10,
  };

const defaultCpuRoutineRequest: RunCpuRoutineRequest = {
  length_seconds: 10,
};

const defaultDiskReadRequest: RunDiskReadRequest = {
  type: DiskReadRoutineType.linear,
  length_seconds: 10,
  file_size_mb: 100,
};

const defaultNvmeSelfTestRequest: RunNvmeSelfTestRequest = {
  test_type: NvmeSelfTestType.short_test,
};

const defaultNvmeWearLevelRequest: RunNvmeWearLevelRequest = {
  wear_level_threshold: 100,
};

const defaultPowerButtonRequest: RunPowerButtonRequest = {
  timeout_seconds: 10,
};

const defaultSmartctlCheck: RunSmartctlCheckRequest = {};

export const diagnosticsParams = new Map<string, DiagnosticsParamsUnion>([
  [RoutineType.ac_power, defaultAcPowerRoutineRequest],
  [RoutineType.battery_charge, defaultBatteryChargeRoutineRequest],
  [RoutineType.battery_discharge, defaultBatteryDischargeRoutineRequest],
  [RoutineType.bluetooth_pairing, defaultBluetoothPairingRoutineRequest],
  [RoutineType.bluetooth_scanning, defaultBluetoothScanningRoutineRequest],
  [RoutineType.cpu_cache, defaultCpuRoutineRequest],
  [RoutineType.cpu_floating_point_accuracy, defaultCpuRoutineRequest],
  [RoutineType.cpu_prime_search, defaultCpuRoutineRequest],
  [RoutineType.cpu_stress, defaultCpuRoutineRequest],
  [RoutineType.disk_read, defaultDiskReadRequest],
  [RoutineType.nvme_self_test, defaultNvmeSelfTestRequest],
  [RoutineType.nvme_wear_level, defaultNvmeWearLevelRequest],
  [RoutineType.power_button, defaultPowerButtonRequest],
  [RoutineType.smartctl_check, defaultSmartctlCheck],
]);
