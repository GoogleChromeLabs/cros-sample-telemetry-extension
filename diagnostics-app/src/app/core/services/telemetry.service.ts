// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Service for fetching telemetry data from Chrome extension.
 */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  BatteryInfo,
  BlockDeviceInfo,
  CpuInfo,
  DpslTypes,
  MemoryInfo,
  StatefulPartitionInfo,
  VpdInfo,
} from '@common/dpsl';
import {
  Request,
  Response,
  RequestType,
  TelemetryInfoType,
} from '@common/message';

export interface TelemetryInterface {
  fetchBatteryInfo(): Promise<BatteryInfo>;
  fetchBlockDeviceInfo(): Promise<BlockDeviceInfo>;
  fetchCpuInfo(): Promise<CpuInfo>;
  fetchMemoryInfo(): Promise<MemoryInfo>;
  fetchStatefulPartitionInfo(): Promise<StatefulPartitionInfo>;
  fetchVpdInfo(): Promise<VpdInfo>;
}

@Injectable({
  providedIn: 'root',
})
export class TelemetryService implements TelemetryInterface {
  private extensionId!: string;

  private constructTelemetryRequest: (infoType: TelemetryInfoType) => Request =
    (infoType) => {
      return { type: RequestType.TELEMETRY, telemetry: { infoType } };
    };

  private fetchTelemetryData: (
    infoType: TelemetryInfoType
  ) => Promise<DpslTypes> | undefined = (category) => {
    return new Promise((resolve, reject) => {
      const request = this.constructTelemetryRequest(category);
      try {
        //@ts-ignore
        window.chrome.runtime.sendMessage(
          this.extensionId,
          request,
          (response: Response) => {
            if (!response.success) {
              throw response.error;
            }
            if (!response.telemetry) {
              throw 'Invalid response';
            } else {
              resolve(response.telemetry.info);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  constructor() {
    this.extensionId = environment.extensionId;
  }

  fetchBatteryInfo() {
    return <Promise<BatteryInfo>>(
      this.fetchTelemetryData(TelemetryInfoType.BATTERY)
    );
  }

  fetchBlockDeviceInfo() {
    return <Promise<BlockDeviceInfo>>(
      this.fetchTelemetryData(TelemetryInfoType.BLOCK_DEVICE)
    );
  }

  fetchCpuInfo() {
    return <Promise<CpuInfo>>this.fetchTelemetryData(TelemetryInfoType.CPU);
  }

  fetchMemoryInfo() {
    return <Promise<MemoryInfo>>(
      this.fetchTelemetryData(TelemetryInfoType.MEMORY)
    );
  }

  fetchStatefulPartitionInfo() {
    return <Promise<StatefulPartitionInfo>>(
      this.fetchTelemetryData(TelemetryInfoType.STATEFUL_PARTITION)
    );
  }

  fetchVpdInfo() {
    return <Promise<VpdInfo>>this.fetchTelemetryData(TelemetryInfoType.VPD);
  }
}
