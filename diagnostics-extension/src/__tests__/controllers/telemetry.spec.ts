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
  TelemetryInfoUnion,
} from '../../common/message';
import {handleTelemetry} from '../../controllers/telemetry';
import * as fakeData from '../../services/fake_telemetry.data';

describe('should return correct error messages', () => {
  it('should return error when telemetry object is missing', async () => {
    const req: Request = {type: RequestType.TELEMETRY};
    const res: (response: Response) => void = jest.fn();

    await handleTelemetry(req, res);

    expect(res).toHaveBeenCalledWith({
      success: false,
      error: {message: ResponseErrorInfoMessage.MissingTelemetryRequest},
    });
  });

  it('should return error when telemetry infoType is invalid', async () => {
    const req: Request = {
      type: RequestType.TELEMETRY,
      //@ts-ignore
      telemetry: {info: 'invalid_type'},
    };
    const res: (response: Response) => void = jest.fn();

    await handleTelemetry(req, res);

    expect(res).toHaveBeenCalledWith({
      success: false,
      error: {message: ResponseErrorInfoMessage.InvalidTelemetryInfoType},
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
      error: {message: ResponseErrorInfoMessage.InvalidTelemetryInfoType},
    });
  });
});

describe('should return correct telemetry data', () => {
  let req: Request;
  let res: (response: Response) => void;

  beforeEach(() => {
    req = {type: RequestType.TELEMETRY};
    res = jest.fn();
  });

  const testCases: {
    name: string;
    infoType: TelemetryInfoType;
    expectedResult: TelemetryInfoUnion;
  }[] = [
    {
      name: 'audio',
      infoType: TelemetryInfoType.AUDIO,
      expectedResult: fakeData.audioInfo,
    },
    {
      name: 'battery',
      infoType: TelemetryInfoType.BATTERY,
      expectedResult: fakeData.batteryInfo,
    },
    {
      name: 'block device',
      infoType: TelemetryInfoType.BLOCK_DEVICE,
      expectedResult: fakeData.blockDeviceInfo,
    },
    {
      name: 'cpu',
      infoType: TelemetryInfoType.CPU,
      expectedResult: fakeData.cpuInfo,
    },
    {
      name: 'display',
      infoType: TelemetryInfoType.DISPLAY,
      expectedResult: fakeData.displayInfo,
    },
    {
      name: 'marketing',
      infoType: TelemetryInfoType.MARKETING,
      expectedResult: fakeData.marketingInfo,
    },
    {
      name: 'memory',
      infoType: TelemetryInfoType.MEMORY,
      expectedResult: fakeData.memoryInfo,
    },
    {
      name: 'network',
      infoType: TelemetryInfoType.NETWORK,
      expectedResult: fakeData.networkInfo,
    },
    {
      name: 'oem',
      infoType: TelemetryInfoType.OEM,
      expectedResult: fakeData.oemInfo,
    },
    {
      name: 'os version',
      infoType: TelemetryInfoType.OS_VERSION,
      expectedResult: fakeData.osVersionInfo,
    },
    {
      name: 'usb',
      infoType: TelemetryInfoType.USB,
      expectedResult: fakeData.usbInfo,
    },
    {
      name: 'vpd',
      infoType: TelemetryInfoType.VPD,
      expectedResult: fakeData.vpdInfo,
    },
    {
      name: 'stateful partition',
      infoType: TelemetryInfoType.STATEFUL_PARTITION,
      expectedResult: fakeData.statefulPartitionInfo,
    },
    {
      name: 'tpm',
      infoType: TelemetryInfoType.TPM,
      expectedResult: fakeData.tpmInfo,
    },
  ];

  testCases.forEach((testCase) => {
    it(`should return correct ${testCase.name} info`, async () => {
      req = {...req, telemetry: {infoType: testCase.infoType}};

      await handleTelemetry(req, res);

      const payload = {info: testCase.expectedResult};
      expect(res).toHaveBeenCalledWith({
        success: true,
        telemetry: payload,
      });
    });
  });
});
