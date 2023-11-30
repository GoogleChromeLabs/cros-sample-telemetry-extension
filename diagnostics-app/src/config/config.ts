// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {EventCategory, RoutineType} from '@common/telemetry-extension-types';
import {TelemetryInfoType} from '@common/message';

export const APP_NAME = 'telemetry-extension-types Reference App';

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
