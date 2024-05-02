/**
 * @fileoverview Functions to generate fake telemetry data.
 */

// Fake data may not use certain parameter variables.
/* eslint-disable @typescript-eslint/no-unused-vars */

// Telemetry extension API types may not be camelCase.
/* eslint-disable camelcase */

import {
  AudioInfo,
  BatteryInfo,
  CpuArchitectureEnum,
  CpuInfo,
  DisplayInfo,
  DisplayInputType,
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

export const audioInfo: AudioInfo = {
  outputNodes: [{}],
  inputNodes: [{}],
};
export async function getAudioInfo(): Promise<AudioInfo> {
  return audioInfo;
}

export const batteryInfo: BatteryInfo = {
  cycleCount: 75,
  voltageNow: 14,
  vendor: 'google',
  serialNumber: 'test-bat-111',
  chargeFullDesign: 100,
  chargeFull: 98,
  voltageMinDesign: 12,
  modelName: 'best-model-111x',
  chargeNow: 76,
  currentNow: 4,
  technology: 'plutonium',
  status: 'good',
  manufactureDate: '2019-07-09T16:59:39.787Z',
  temperature: 43,
};
export async function getBatteryInfo(): Promise<BatteryInfo> {
  return batteryInfo;
}

export const blockDeviceInfo: NonRemovableBlockDeviceInfoResponse = [
  {
    size: 256060514304,
    type: 'block:nvme:pci:pci',
    name: 'WDC PC SN520 SDAPTUW-256G-1006',
  },
];
export async function getNonRemovableBlockDevicesInfo(): Promise<NonRemovableBlockDeviceInfoResponse> {
  return blockDeviceInfo;
}

export const cpuInfo: CpuInfo = {
  numTotalThreads: 8,
  architecture: CpuArchitectureEnum.x86_64,
  physicalCpus: [
    {
      modelName: 'Intel(R) Core(TM) i7-10610U CPU @ 1.80GHz',
      logicalCpus: [
        {
          coreId: 0,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
        {
          coreId: 1,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
        {
          coreId: 2,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
        {
          coreId: 3,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
        {
          coreId: 4,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
        {
          coreId: 5,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
        {
          coreId: 6,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
        {
          coreId: 7,
          cStates: [
            {
              name: 'C7s',
              timeInStateSinceLastBootUs: 390138,
            },
            {
              name: 'C3',
              timeInStateSinceLastBootUs: 49855211,
            },
            {
              name: 'C1',
              timeInStateSinceLastBootUs: 30454853,
            },
            {
              name: 'C10',
              timeInStateSinceLastBootUs: 76313915692,
            },
            {
              name: 'C8',
              timeInStateSinceLastBootUs: 1383657700,
            },
            {
              name: 'C6',
              timeInStateSinceLastBootUs: 1634102253,
            },
            {
              name: 'C1E',
              timeInStateSinceLastBootUs: 70434254,
            },
            {
              name: 'POLL',
              timeInStateSinceLastBootUs: 340080,
            },
            {
              name: 'C9',
              timeInStateSinceLastBootUs: 127594822,
            },
          ],
          idleTimeMs: 7963395,
          scalingCurrentFrequencyKhz: 3042798,
          scalingMaxFrequencyKhz: 4900000,
          maxClockSpeedKhz: 4900000,
        },
      ],
    },
  ],
};
export async function getCpuInfo(): Promise<CpuInfo> {
  return cpuInfo;
}

export const displayInfo: DisplayInfo = {
  embeddedDisplay: {
    inputType: DisplayInputType.unknown,
  },
  externalDisplays: [
    {
      inputType: DisplayInputType.unknown,
    },
  ],
};
export async function getDisplayInfo(): Promise<DisplayInfo> {
  return displayInfo;
}

export const marketingInfo: MarketingInfo = {};
export async function getMarketingInfo(): Promise<MarketingInfo> {
  return marketingInfo;
}

export const memoryInfo: MemoryInfo = {
  totalMemoryKiB: 16270856,
  freeMemoryKiB: 13067496,
  availableMemoryKiB: 14810656,
  pageFaultsSinceLastBoot: '62076622',
};
export async function getMemoryInfo(): Promise<MemoryInfo> {
  return memoryInfo;
}

export const networkInfo: InternetConnectivityInfo = {
  networks: [{ipv6Addresses: ['2001:db8:3333:4444:5555:6666:7777:8888']}],
};
export async function getInternetConnectivityInfo(): Promise<InternetConnectivityInfo> {
  return networkInfo;
}

export const oemInfo: OemData = {
  oemData: 'ABCDEFGHIJKLMN',
};
export async function getOemData(): Promise<OemData> {
  return oemInfo;
}

export const osVersionInfo: OsVersionInfo = {};
export async function getOsVersionInfo(): Promise<OsVersionInfo> {
  return osVersionInfo;
}

export const usbInfo: UsbBusDevices = {
  devices: [{interfaces: [{}]}],
};
export async function getUsbBusInfo(): Promise<UsbBusDevices> {
  return usbInfo;
}

export const vpdInfo: VpdInfo = {
  skuNumber: 'sku',
  serialNumber: 'serial-number',
  modelName: 'model',
};
export async function getVpdInfo(): Promise<VpdInfo> {
  return vpdInfo;
}

export const statefulPartitionInfo: StatefulPartitionInfo = {
  availableSpace: 1340000,
  totalSpace: 2005000,
};
export async function getStatefulPartitionInfo(): Promise<StatefulPartitionInfo> {
  return statefulPartitionInfo;
}

export const tpmInfo: TpmInfo = {
  version: {},
  status: {},
  dictionaryAttack: {},
};
export async function getTpmInfo(): Promise<TpmInfo> {
  return tpmInfo;
}
