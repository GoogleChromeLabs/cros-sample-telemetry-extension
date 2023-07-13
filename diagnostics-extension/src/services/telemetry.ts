// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Classes related to telemetry
 */

import { dpsl } from 'cros-dpsl-js';

import {
  BacklightInfo,
  BatteryInfo,
  BlockDeviceInfo,
  BluetoothInfo,
  CpuInfo,
  FanInfo,
  MemoryInfo,
  OemData,
  StatefulPartitionInfo,
  TimezoneInfo,
  VpdInfo,
} from '@common/dpsl';
import * as fakeData from './fake_telemetry.data';
import { environment } from '../environments/environment';
import { ResponseErrorInfoMessage } from '@common/message';

/**
 * Abstract class reprensenting the interface of
 * service to fetch system telemetry data
 */
export abstract class TelemetryService {
  getBacklightInfo(): Promise<BacklightInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getBatteryInfo(): Promise<BatteryInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getBluetoothInfo(): Promise<BluetoothInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getCachedVpdInfo(): Promise<VpdInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getCpuInfo(): Promise<CpuInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getFanInfo(): Promise<FanInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getMemoryInfo(): Promise<MemoryInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getNonRemovableBlockDevicesInfo(): Promise<BlockDeviceInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getOemData(): Promise<OemData> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
  getTimezoneInfo(): Promise<TimezoneInfo> {
    return Promise.reject(ResponseErrorInfoMessage.UnsupportedTelemetryFunction);
  }
}

/**
 * Implementation of TelemetryService.
 * @extends TelemetryService
 */
export class TelemetryServiceImpl extends TelemetryService {
  async getCachedVpdInfo(): Promise<VpdInfo> {
    return dpsl.telemetry.getVpdInfo();
  }
  async getOemData(): Promise<OemData> {
    return dpsl.telemetry.getOemData();
  }
  async getCpuInfo(): Promise<CpuInfo> {
    return dpsl.telemetry.getCpuInfo();
  }
}

/**
 * Fake implementation of TelemetryService. Used in unit tests.
 * @extends TelemetryService
 */
export class FakeTelemetryService extends TelemetryService {
  async getBacklightInfo(): Promise<BacklightInfo> {
    return fakeData.backlightInfo();
  }
  async getBatteryInfo(): Promise<BatteryInfo> {
    return fakeData.batteryInfo();
  }
  async getBluetoothInfo(): Promise<BluetoothInfo> {
    return fakeData.bluetoothInfo();
  }
  async getCachedVpdInfo(): Promise<VpdInfo> {
    return fakeData.vpdInfo();
  }
  async getCpuInfo(): Promise<CpuInfo> {
    return fakeData.cpuInfo();
  }
  async getFanInfo(): Promise<FanInfo> {
    return fakeData.fanInfo();
  }
  async getMemoryInfo(): Promise<MemoryInfo> {
    return fakeData.memoryInfo();
  }
  async getNonRemovableBlockDevicesInfo(): Promise<BlockDeviceInfo> {
    return fakeData.blockDeviceInfo();
  }
  async getOemData(): Promise<OemData> {
    return fakeData.oemData();
  }
  async getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
    return fakeData.statefulPartitionInfo();
  }
  async getTimezoneInfo(): Promise<TimezoneInfo> {
    return fakeData.timezoneInfo();
  }
}

/**
 * Singleton provider for instance of Telemetry Service
 * Returns a fake telemetry service implementation
 * @extends TelemetryService
 */
export class TelemetryServiceProvider {
  private static instance: TelemetryService;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getTelemetryService(): TelemetryService {
    if (!TelemetryServiceProvider.instance) {
      if (environment.testModeEnabled) {
        TelemetryServiceProvider.instance = new FakeTelemetryService();
      } else {
        TelemetryServiceProvider.instance = new TelemetryServiceImpl();
      }
    }
    return TelemetryServiceProvider.instance;
  }
}
