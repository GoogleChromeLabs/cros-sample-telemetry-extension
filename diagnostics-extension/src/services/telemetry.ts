// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Classes related to telemetry
 */

// The API calls to chrome.os* are not defined in the standard chrome type.
// Allow type-casting into any for access.
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AudioInfo,
  BatteryInfo,
  NonRemovableBlockDeviceInfoResponse,
  CpuInfo,
  DisplayInfo,
  MarketingInfo,
  MemoryInfo,
  InternetConnectivityInfo,
  OemData,
  OsVersionInfo,
  UsbBusDevices,
  VpdInfo,
  StatefulPartitionInfo,
  TpmInfo,
} from '@common/dpsl';
import * as fakeTelemetry from './fake_telemetry.data';
import {environment} from '../environments/environment';

/**
 * Abstract class reprensenting the interface of
 * service to fetch system telemetry data
 */
export abstract class TelemetryService {
  abstract getAudioInfo(): Promise<AudioInfo>;
  abstract getBatteryInfo(): Promise<BatteryInfo>;
  abstract getNonRemovableBlockDevicesInfo(): Promise<NonRemovableBlockDeviceInfoResponse>;
  abstract getCpuInfo(): Promise<CpuInfo>;
  abstract getDisplayInfo(): Promise<DisplayInfo>;
  abstract getMarketingInfo(): Promise<MarketingInfo>;
  abstract getMemoryInfo(): Promise<MemoryInfo>;
  abstract getInternetConnectivityInfo(): Promise<InternetConnectivityInfo>;
  abstract getOemData(): Promise<OemData>;
  abstract getOsVersionInfo(): Promise<OsVersionInfo>;
  abstract getUsbBusInfo(): Promise<UsbBusDevices>;
  abstract getVpdInfo(): Promise<VpdInfo>;
  abstract getStatefulPartitionInfo(): Promise<StatefulPartitionInfo>;
  abstract getTpmInfo(): Promise<TpmInfo>;
}

/**
 * Implementation of TelemetryService.
 * @extends TelemetryService
 */
export class TelemetryServiceImpl extends TelemetryService {
  async getAudioInfo(): Promise<AudioInfo> {
    return (chrome as any).os.telemetry.getAudioInfo();
  }
  async getBatteryInfo(): Promise<BatteryInfo> {
    return (chrome as any).os.telemetry.getBatteryInfo();
  }
  async getNonRemovableBlockDevicesInfo(): Promise<NonRemovableBlockDeviceInfoResponse> {
    return (chrome as any).os.telemetry.getNonRemovableBlockDevicesInfo();
  }
  async getCpuInfo(): Promise<CpuInfo> {
    return (chrome as any).os.telemetry.getCpuInfo();
  }
  async getDisplayInfo(): Promise<DisplayInfo> {
    return (chrome as any).os.telemetry.getDisplayInfo();
  }
  async getMarketingInfo(): Promise<MarketingInfo> {
    return (chrome as any).os.telemetry.getMarketingInfo();
  }
  async getMemoryInfo(): Promise<MemoryInfo> {
    return (chrome as any).os.telemetry.getMemoryInfo();
  }
  async getInternetConnectivityInfo(): Promise<InternetConnectivityInfo> {
    return (chrome as any).os.telemetry.getInternetConnectivityInfo();
  }
  async getOemData(): Promise<OemData> {
    return (chrome as any).os.telemetry.getOemData();
  }
  async getOsVersionInfo(): Promise<OsVersionInfo> {
    return (chrome as any).os.telemetry.getOsVersionInfo();
  }
  async getUsbBusInfo(): Promise<UsbBusDevices> {
    return (chrome as any).os.telemetry.getUsbBusInfo();
  }
  async getVpdInfo(): Promise<VpdInfo> {
    return (chrome as any).os.telemetry.getVpdInfo();
  }
  async getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
    return (chrome as any).os.telemetry.getStatefulPartitionInfo();
  }
  async getTpmInfo(): Promise<TpmInfo> {
    return (chrome as any).os.telemetry.getTpmInfo();
  }
}

/**
 * Fake implementation of TelemetryService. Used in unit tests.
 * @extends TelemetryService
 */
export class FakeTelemetryService extends TelemetryService {
  async getAudioInfo(): Promise<AudioInfo> {
    return fakeTelemetry.getAudioInfo();
  }
  async getBatteryInfo(): Promise<BatteryInfo> {
    return fakeTelemetry.getBatteryInfo();
  }
  async getNonRemovableBlockDevicesInfo(): Promise<NonRemovableBlockDeviceInfoResponse> {
    return fakeTelemetry.getNonRemovableBlockDevicesInfo();
  }
  async getCpuInfo(): Promise<CpuInfo> {
    return fakeTelemetry.getCpuInfo();
  }
  async getDisplayInfo(): Promise<DisplayInfo> {
    return fakeTelemetry.getDisplayInfo();
  }
  async getMarketingInfo(): Promise<MarketingInfo> {
    return fakeTelemetry.getMarketingInfo();
  }
  async getMemoryInfo(): Promise<MemoryInfo> {
    return fakeTelemetry.getMemoryInfo();
  }
  async getInternetConnectivityInfo(): Promise<InternetConnectivityInfo> {
    return fakeTelemetry.getInternetConnectivityInfo();
  }
  async getOemData(): Promise<OemData> {
    return fakeTelemetry.getOemData();
  }
  async getOsVersionInfo(): Promise<OsVersionInfo> {
    return fakeTelemetry.getOsVersionInfo();
  }
  async getUsbBusInfo(): Promise<UsbBusDevices> {
    return fakeTelemetry.getUsbBusInfo();
  }
  async getVpdInfo(): Promise<VpdInfo> {
    return fakeTelemetry.getVpdInfo();
  }
  async getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
    return fakeTelemetry.getStatefulPartitionInfo();
  }
  async getTpmInfo(): Promise<TpmInfo> {
    return fakeTelemetry.getTpmInfo();
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
