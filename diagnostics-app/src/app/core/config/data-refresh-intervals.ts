/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

import {TelemetryInfoType} from 'common/message';

export const defaultTelemetryRefreshInterval = 10000;
export const defaultDiagnosticsRefreshInterval = 500;

export const refreshIntervals = {
  telemetry: new Map<string, number>([
    [TelemetryInfoType.BATTERY, 1000],
    [TelemetryInfoType.CPU, 1000],
    [TelemetryInfoType.STATEFUL_PARTITION, 60000],
  ]),
  diagnostics: new Map<string, number>([]),
};
