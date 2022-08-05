// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for src/controllers/telemetry
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Request,
  Response,
  RequestType,
  TelemetryInfoType,
  ResponseErrorInfoMessage,
} from '@common/message';
import { DpslTypes } from '@common/dpsl';
import { handleTelemetry } from '../../controllers/telemetry';
import * as fakeData from '../../services/fake_telemetry.data';

describe('should return correct error messages', () => {
  it('should return error when telemetry object is missing', async () => {
    const req: Request = { type: RequestType.TELEMETRY };
    const res: (response: Response) => void = jest.fn();

    await handleTelemetry(req, res);

    expect(res).toHaveBeenCalledWith({
      success: false,
      error: { message: ResponseErrorInfoMessage.MissingTelemetryRequest },
    });
  });

  it('should return error when telemetry infoType is invalid', async () => {
    const req: Request = {
      type: RequestType.TELEMETRY,
      //@ts-ignore
      telemetry: { info: 'CACHED_VPD' },
    };
    const res: (response: Response) => void = jest.fn();

    await handleTelemetry(req, res);

    expect(res).toHaveBeenCalledWith({
      success: false,
      error: { message: ResponseErrorInfoMessage.InvalidTelemetryInfoType },
    });
  });

  it('should return error when telemetry infoType is missing', async () => {
    const req: Request = {
      type: RequestType.TELEMETRY,
      //@ts-ignore
      telemetry: {},
    };
    const res: (response: Response) => void = jest.fn();

    await handleTelemetry(req, res);

    expect(res).toHaveBeenCalledWith({
      success: false,
      error: { message: ResponseErrorInfoMessage.InvalidTelemetryInfoType },
    });
  });
});

describe('should return correct telemetry data', () => {
  let req: Request;
  let res: (response: Response) => void;

  beforeEach(() => {
    req = { type: RequestType.TELEMETRY };
    res = jest.fn();
  });

  const testCases: {
    name: string;
    infoType: TelemetryInfoType;
    expectedResult: DpslTypes;
  }[] = [
    {
      name: `backlight`,
      infoType: TelemetryInfoType.BACKLIGHT,
      expectedResult: fakeData.backlightInfo(),
    },
    {
      name: `battery`,
      infoType: TelemetryInfoType.BATTERY,
      expectedResult: fakeData.batteryInfo(),
    },
    {
      name: `bluetooth`,
      infoType: TelemetryInfoType.BLUETOOTH,
      expectedResult: fakeData.bluetoothInfo(),
    },
    {
      name: `vpd`,
      infoType: TelemetryInfoType.VPD,
      expectedResult: fakeData.vpdInfo(),
    },
    {
      name: `cpu`,
      infoType: TelemetryInfoType.CPU,
      expectedResult: fakeData.cpuInfo(),
    },
    {
      name: `fan`,
      infoType: TelemetryInfoType.FAN,
      expectedResult: fakeData.fanInfo(),
    },
    {
      name: `memory`,
      infoType: TelemetryInfoType.MEMORY,
      expectedResult: fakeData.memoryInfo(),
    },
    {
      name: `block device`,
      infoType: TelemetryInfoType.BLOCK_DEVICE,
      expectedResult: fakeData.blockDeviceInfo(),
    },
    {
      name: `stateful partition`,
      infoType: TelemetryInfoType.STATEFUL_PARTITION,
      expectedResult: fakeData.statefulPartitionInfo(),
    },
    {
      name: `timezone`,
      infoType: TelemetryInfoType.TIMEZONE,
      expectedResult: fakeData.timezoneInfo(),
    },
  ];

  testCases.forEach((testCase) => {
    it(`should return correct ${testCase.name} info`, async () => {
      req = { ...req, telemetry: { infoType: testCase.infoType } };

      await handleTelemetry(req, res);

      const payload = { info: testCase.expectedResult };
      expect(res).toHaveBeenCalledWith({
        success: true,
        telemetry: payload,
      });
    });
  });
});
