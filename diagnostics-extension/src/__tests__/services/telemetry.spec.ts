// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for src/services/telemetry
 */

import {
  TelemetryService,
  TelemetryServiceProvider,
} from '../../services/telemetry';
import * as fakeData from '../../services/fake_telemetry.data';
import { DpslTypes } from '@common/dpsl';

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
    methodUnderTest: () => Promise<DpslTypes>;
    expectedResult: DpslTypes;
  }[] = [
    {
      name: `backlight`,
      methodUnderTest: telemetryService.getBacklightInfo,
      expectedResult: fakeData.backlightInfo(),
    },
    {
      name: `battery`,
      methodUnderTest: telemetryService.getBatteryInfo,
      expectedResult: fakeData.batteryInfo(),
    },
    {
      name: `bluetooth`,
      methodUnderTest: telemetryService.getBluetoothInfo,
      expectedResult: fakeData.bluetoothInfo(),
    },
    {
      name: `vpd`,
      methodUnderTest: telemetryService.getCachedVpdInfo,
      expectedResult: fakeData.vpdInfo(),
    },
    {
      name: `cpu`,
      methodUnderTest: telemetryService.getCpuInfo,
      expectedResult: fakeData.cpuInfo(),
    },
    {
      name: `fan`,
      methodUnderTest: telemetryService.getFanInfo,
      expectedResult: fakeData.fanInfo(),
    },
    {
      name: `memory`,
      methodUnderTest: telemetryService.getMemoryInfo,
      expectedResult: fakeData.memoryInfo(),
    },
    {
      name: `block device`,
      methodUnderTest: telemetryService.getNonRemovableBlockDevicesInfo,
      expectedResult: fakeData.blockDeviceInfo(),
    },
    {
      name: `stateful partition`,
      methodUnderTest: telemetryService.getStatefulPartitionInfo,
      expectedResult: fakeData.statefulPartitionInfo(),
    },
    {
      name: `timezone`,
      methodUnderTest: telemetryService.getTimezoneInfo,
      expectedResult: fakeData.timezoneInfo(),
    },
  ];

  testCases.forEach((testCase) => {
    test(`should fetch correct ${testCase.name} info`, async () => {
      const data = await testCase.methodUnderTest();
      expect(data).toStrictEqual(testCase.expectedResult);
    });
  });
});
