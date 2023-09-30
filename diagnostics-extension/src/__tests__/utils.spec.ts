// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Unit tests for src/utils
 */

import { BatteryInfo } from '@common/dpsl';
import { Response, TelemetryResponse } from '@common/message';
import {
  generateErrorResponse,
  generateTelemetrySuccessResponse,
} from '../utils';
import * as fakeData from '../services/fake_telemetry.data';

describe('should generate correct response objects', () => {
  it('should generate correct error object', () => {
    const message = 'Error message';
    const errorResponse: Response = generateErrorResponse(message);
    expect(errorResponse).toEqual({
      success: false,
      error: {
        message,
      },
    });
  });

  it('should generate correct telemetry response object', async () => {
    const info: BatteryInfo = await fakeData.getBatteryInfo();
    const payload: TelemetryResponse = { info };
    const response: Response = generateTelemetrySuccessResponse(payload);
    expect(response).toEqual({
      success: true,
      telemetry: payload,
    });
  });
});
