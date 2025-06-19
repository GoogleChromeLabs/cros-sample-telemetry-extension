/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {RoutineV2Category, TelemetryInfoType} from '../message';
import {EventCategory} from '../telemetry-extension-types/events';
import {RoutineType} from '../telemetry-extension-types/legacy-diagnostics';
import {
  CreateFanRoutineArguments,
  CreateMemoryRoutineArguments,
  CreateNetworkBandwidthRoutineArguments,
  CreateRoutineArgumentsUnion,
  CreateVolumeButtonRoutineArguments,
  VolumeButtonType,
} from '../telemetry-extension-types/routines';

export const VISIBLE_TELEMETRY_CARDS: TelemetryInfoType[] = [
  TelemetryInfoType.AUDIO,
  TelemetryInfoType.BATTERY,
  TelemetryInfoType.BLOCK_DEVICE,
  TelemetryInfoType.CPU,
  TelemetryInfoType.DISPLAY,
  TelemetryInfoType.MARKETING,
  TelemetryInfoType.MEMORY,
  TelemetryInfoType.NETWORK,
  TelemetryInfoType.OEM,
  TelemetryInfoType.OS_VERSION,
  TelemetryInfoType.USB,
  TelemetryInfoType.VPD,
  TelemetryInfoType.STATEFUL_PARTITION,
  TelemetryInfoType.TPM,
  TelemetryInfoType.THERMAL,
];

export const VISIBLE_EVENT_CARDS: EventCategory[] = [
  EventCategory.audio_jack,
  EventCategory.external_display,
  EventCategory.keyboard_diagnostic,
  EventCategory.lid,
  EventCategory.sd_card,
  EventCategory.stylus_connected,
  EventCategory.stylus_garage,
  EventCategory.stylus_touch,
  EventCategory.touchpad_button,
  EventCategory.touchpad_connected,
  EventCategory.touchpad_touch,
  EventCategory.touchscreen_connected,
  EventCategory.touchscreen_touch,
  EventCategory.usb,
  EventCategory.power,
];

export const VISIBLE_DIAGNOSTICS_CARDS: RoutineType[] = [
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
];

// Routine V2 types must have an associated argument for supportability check
// and initialization.
export const FanRoutineArgument: CreateFanRoutineArguments = {};
export const MemoryRoutineArgument: CreateMemoryRoutineArguments = {
  maxTestingMemKib: 10000,
};
export const NetworkBandwidthRoutineArgument: CreateNetworkBandwidthRoutineArguments =
  {};
/* eslint-disable camelcase*/
export const VolumeButtonRoutineArgument: CreateVolumeButtonRoutineArguments = {
  buttonType: VolumeButtonType.volume_up,
  timeoutSeconds: 10,
};
/* eslint-enable camelcase*/

export const VISIBLE_ROUTINE_V2_CARDS: CreateRoutineArgumentsUnion[] = [
  {[RoutineV2Category.FAN]: FanRoutineArgument},
  {[RoutineV2Category.MEMORY]: MemoryRoutineArgument},
  {
    [RoutineV2Category.NETWORK_BANDWIDTH]: NetworkBandwidthRoutineArgument,
  },
  {
    [RoutineV2Category.VOLUME_BUTTON]: VolumeButtonRoutineArgument,
  },
];
