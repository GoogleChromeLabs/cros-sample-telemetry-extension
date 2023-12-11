// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
} from '../common/telemetry-extension-types';

export const audioInfo: AudioInfo = {
  outputNodes: [{}],
  inputNodes: [{}],
};
export const getAudioInfo = async (): Promise<AudioInfo> => audioInfo;

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
export const getBatteryInfo = async (): Promise<BatteryInfo> => batteryInfo;

export const blockDeviceInfo: NonRemovableBlockDeviceInfoResponse = [
  {
    size: 256060514304,
    type: 'block:nvme:pci:pci',
    name: 'WDC PC SN520 SDAPTUW-256G-1006',
  },
];
export const getNonRemovableBlockDevicesInfo =
  async (): Promise<NonRemovableBlockDeviceInfoResponse> => blockDeviceInfo;

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
export const getCpuInfo = async (): Promise<CpuInfo> => cpuInfo;

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
export const getDisplayInfo = async (): Promise<DisplayInfo> => displayInfo;

export const marketingInfo: MarketingInfo = {};
export const getMarketingInfo = async (): Promise<MarketingInfo> =>
  marketingInfo;

export const memoryInfo: MemoryInfo = {
  totalMemoryKiB: 16270856,
  freeMemoryKiB: 13067496,
  availableMemoryKiB: 14810656,
  pageFaultsSinceLastBoot: '62076622',
};
export const getMemoryInfo = async (): Promise<MemoryInfo> => memoryInfo;

export const networkInfo: InternetConnectivityInfo = {
  networks: [{ipv6Addresses: ['2001:db8:3333:4444:5555:6666:7777:8888']}],
};
export const getInternetConnectivityInfo =
  async (): Promise<InternetConnectivityInfo> => networkInfo;

export const oemInfo: OemData = {
  oemData: 'ABCDEFGHIJKLMN',
};
export const getOemData = async (): Promise<OemData> => oemInfo;

export const osVersionInfo: OsVersionInfo = {};
export const getOsVersionInfo = async (): Promise<OsVersionInfo> =>
  osVersionInfo;

export const usbInfo: UsbBusDevices = {
  devices: [{interfaces: [{}]}],
};
export const getUsbBusInfo = async (): Promise<UsbBusDevices> => usbInfo;

export const vpdInfo: VpdInfo = {
  skuNumber: 'sku',
  serialNumber: 'serial-number',
  modelName: 'model',
};
export const getVpdInfo = async (): Promise<VpdInfo> => vpdInfo;

export const statefulPartitionInfo: StatefulPartitionInfo = {
  availableSpace: 1340000,
  totalSpace: 2005000,
};
export const getStatefulPartitionInfo =
  async (): Promise<StatefulPartitionInfo> => statefulPartitionInfo;

export const tpmInfo: TpmInfo = {
  version: {},
  status: {},
  dictionaryAttack: {},
};
export const getTpmInfo = async (): Promise<TpmInfo> => tpmInfo;
