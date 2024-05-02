/**
 * @fileoverview Classes related to telemetry
 */

// The API calls to chrome.os* are not defined in the standard chrome type.
// Allow type-casting into any for access.
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AudioInfo,
  BatteryInfo,
  CpuInfo,
  DisplayInfo,
  InternetConnectivityInfo,
  MarketingInfo,
  MemoryInfo,
  NonRemovableBlockDeviceInfoResponse,
  OemData,
  OsVersionInfo,
  StatefulPartitionInfo,
  TpmInfo,
  UsbBusDevices,
  VpdInfo,
} from '../common/telemetry-extension-types/telemetry';
import {environment} from '../environments/environment';
import * as fakeTelemetry from './fake-telemetry.data';

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
  public async getAudioInfo(): Promise<AudioInfo> {
    return (chrome as any).os.telemetry.getAudioInfo();
  }
  public async getBatteryInfo(): Promise<BatteryInfo> {
    return (chrome as any).os.telemetry.getBatteryInfo();
  }
  public async getNonRemovableBlockDevicesInfo(): Promise<NonRemovableBlockDeviceInfoResponse> {
    return (chrome as any).os.telemetry.getNonRemovableBlockDevicesInfo();
  }
  public async getCpuInfo(): Promise<CpuInfo> {
    return (chrome as any).os.telemetry.getCpuInfo();
  }
  public async getDisplayInfo(): Promise<DisplayInfo> {
    return (chrome as any).os.telemetry.getDisplayInfo();
  }
  public async getMarketingInfo(): Promise<MarketingInfo> {
    return (chrome as any).os.telemetry.getMarketingInfo();
  }
  public async getMemoryInfo(): Promise<MemoryInfo> {
    return (chrome as any).os.telemetry.getMemoryInfo();
  }
  public async getInternetConnectivityInfo(): Promise<InternetConnectivityInfo> {
    return (chrome as any).os.telemetry.getInternetConnectivityInfo();
  }
  public async getOemData(): Promise<OemData> {
    return (chrome as any).os.telemetry.getOemData();
  }
  public async getOsVersionInfo(): Promise<OsVersionInfo> {
    return (chrome as any).os.telemetry.getOsVersionInfo();
  }
  public async getUsbBusInfo(): Promise<UsbBusDevices> {
    return (chrome as any).os.telemetry.getUsbBusInfo();
  }
  public async getVpdInfo(): Promise<VpdInfo> {
    return (chrome as any).os.telemetry.getVpdInfo();
  }
  public async getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
    return (chrome as any).os.telemetry.getStatefulPartitionInfo();
  }
  public async getTpmInfo(): Promise<TpmInfo> {
    return (chrome as any).os.telemetry.getTpmInfo();
  }
}

/**
 * Fake implementation of TelemetryService. Used in unit tests.
 * @extends TelemetryService
 */
export class FakeTelemetryService extends TelemetryService {
  public async getAudioInfo(): Promise<AudioInfo> {
    return fakeTelemetry.getAudioInfo();
  }
  public async getBatteryInfo(): Promise<BatteryInfo> {
    return fakeTelemetry.getBatteryInfo();
  }
  public async getNonRemovableBlockDevicesInfo(): Promise<NonRemovableBlockDeviceInfoResponse> {
    return fakeTelemetry.getNonRemovableBlockDevicesInfo();
  }
  public async getCpuInfo(): Promise<CpuInfo> {
    return fakeTelemetry.getCpuInfo();
  }
  public async getDisplayInfo(): Promise<DisplayInfo> {
    return fakeTelemetry.getDisplayInfo();
  }
  public async getMarketingInfo(): Promise<MarketingInfo> {
    return fakeTelemetry.getMarketingInfo();
  }
  public async getMemoryInfo(): Promise<MemoryInfo> {
    return fakeTelemetry.getMemoryInfo();
  }
  public async getInternetConnectivityInfo(): Promise<InternetConnectivityInfo> {
    return fakeTelemetry.getInternetConnectivityInfo();
  }
  public async getOemData(): Promise<OemData> {
    return fakeTelemetry.getOemData();
  }
  public async getOsVersionInfo(): Promise<OsVersionInfo> {
    return fakeTelemetry.getOsVersionInfo();
  }
  public async getUsbBusInfo(): Promise<UsbBusDevices> {
    return fakeTelemetry.getUsbBusInfo();
  }
  public async getVpdInfo(): Promise<VpdInfo> {
    return fakeTelemetry.getVpdInfo();
  }
  public async getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
    return fakeTelemetry.getStatefulPartitionInfo();
  }
  public async getTpmInfo(): Promise<TpmInfo> {
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
