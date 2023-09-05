// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Handle telemetry requests
 */

import {
  Request,
  Response,
  ResponseErrorInfoMessage,
  TelemetryInfoType,
  TelemetryResponse,
} from '@common/message';
import { TelemetryServiceProvider } from '../services/telemetry';
import {
  generateErrorResponse,
  generateTelemetrySuccessResponse,
} from '../utils';

type TelemetryController = (
  category: Request,
  res: (data: Response) => void
) => void;

const telemetryService = TelemetryServiceProvider.getTelemetryService();

const mapInfoTypeToMethod = (infoType: TelemetryInfoType) => {
  switch (infoType) {
    case TelemetryInfoType.BATTERY:
      return telemetryService.getBatteryInfo;
    case TelemetryInfoType.BLOCK_DEVICE:
      return telemetryService.getNonRemovableBlockDevicesInfo;
    case TelemetryInfoType.CPU:
      return telemetryService.getCpuInfo;
    case TelemetryInfoType.MEMORY:
      return telemetryService.getMemoryInfo;
    case TelemetryInfoType.STATEFUL_PARTITION:
      return telemetryService.getStatefulPartitionInfo;
    case TelemetryInfoType.VPD:
      return telemetryService.getCachedVpdInfo;
    default:
      return null;
  }
};

export const handleTelemetry: TelemetryController = async (req, res) => {
  if (!req.telemetry)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.MissingTelemetryRequest)
    );

  const infoType = req.telemetry.infoType;
  const requiredMethod = mapInfoTypeToMethod(infoType);

  if (!requiredMethod)
    return res(
      generateErrorResponse(ResponseErrorInfoMessage.InvalidTelemetryInfoType)
    );

  try {
    const data = await requiredMethod();
    const payload: TelemetryResponse = { info: data };
    return res(generateTelemetrySuccessResponse(payload));
  } catch (err) {
    return res(
      generateErrorResponse(String(err))
    );
  }
};
