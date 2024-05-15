/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Unit tests for src/services/telemetry
 */

import {TelemetryInfoUnion} from '../../common/message';
import * as fakeData from '../../services/fake-telemetry.data';
import {
  TelemetryService,
  TelemetryServiceProvider,
} from '../../services/telemetry.service';

describe('should return instance of FakeTelemetryService', () => {
  const telemetryService: TelemetryService =
    TelemetryServiceProvider.getTelemetryService();

  test('should create telemetryService', () => {
    expect(telemetryService).toBeTruthy();
  });

  test('should return same instance of telemetryService', () => {
    const dupTelemetryService: TelemetryService =
      TelemetryServiceProvider.getTelemetryService();
    expect(dupTelemetryService).toStrictEqual(telemetryService);
  });

  const testCases: {
    name: string;
    methodUnderTest: () => Promise<TelemetryInfoUnion>;
    expectedResult: TelemetryInfoUnion;
  }[] = [
    {
      name: 'audio',
      methodUnderTest: telemetryService.getAudioInfo,
      expectedResult: fakeData.audioInfo,
    },
    {
      name: 'battery',
      methodUnderTest: telemetryService.getBatteryInfo,
      expectedResult: fakeData.batteryInfo,
    },
    {
      name: 'block device',
      methodUnderTest: telemetryService.getNonRemovableBlockDevicesInfo,
      expectedResult: fakeData.blockDeviceInfo,
    },
    {
      name: 'cpu',
      methodUnderTest: telemetryService.getCpuInfo,
      expectedResult: fakeData.cpuInfo,
    },
    {
      name: 'display',
      methodUnderTest: telemetryService.getDisplayInfo,
      expectedResult: fakeData.displayInfo,
    },
    {
      name: 'marketing',
      methodUnderTest: telemetryService.getMarketingInfo,
      expectedResult: fakeData.marketingInfo,
    },
    {
      name: 'memory',
      methodUnderTest: telemetryService.getMemoryInfo,
      expectedResult: fakeData.memoryInfo,
    },
    {
      name: 'network',
      methodUnderTest: telemetryService.getInternetConnectivityInfo,
      expectedResult: fakeData.networkInfo,
    },
    {
      name: 'oem',
      methodUnderTest: telemetryService.getOemData,
      expectedResult: fakeData.oemInfo,
    },
    {
      name: 'os version',
      methodUnderTest: telemetryService.getOsVersionInfo,
      expectedResult: fakeData.osVersionInfo,
    },
    {
      name: 'usb',
      methodUnderTest: telemetryService.getUsbBusInfo,
      expectedResult: fakeData.usbInfo,
    },
    {
      name: 'vpd',
      methodUnderTest: telemetryService.getVpdInfo,
      expectedResult: fakeData.vpdInfo,
    },
    {
      name: 'stateful partition',
      methodUnderTest: telemetryService.getStatefulPartitionInfo,
      expectedResult: fakeData.statefulPartitionInfo,
    },
    {
      name: 'tpm',
      methodUnderTest: telemetryService.getTpmInfo,
      expectedResult: fakeData.tpmInfo,
    },
  ];

  testCases.forEach((testCase) => {
    test(`should fetch correct ${testCase.name} info`, async () => {
      const data = await testCase.methodUnderTest();
      expect(data).toStrictEqual(testCase.expectedResult);
    });
  });
});
