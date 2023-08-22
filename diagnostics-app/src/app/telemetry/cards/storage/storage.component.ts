// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the storage card component for telemetry.
 * Imported by telemetry.module.ts
 */

import { Component, OnInit } from '@angular/core';
import { BlockDeviceInfo } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';
import refreshIntervals from '../../../core/config/data-refresh-intervals';

const defaultBlockDeviceInfo: BlockDeviceInfo = [
  {
    path: 'unknown',
    size: '0',
    type: 'unknown',
    manufacturerId: 0,
    name: 'unknown',
    serial: '0',
    bytesReadSinceLastBoot: '0',
    bytesWrittenSinceLastBoot: '0',
    readTimeSecondsSinceLastBoot: '0',
    writeTimeSecondsSinceLastBoot: '0',
    ioTimeSecondsSinceLastBoot: '0',
    discardTimeSecondsSinceLastBoot: '0',
  },
];

@Component({
  selector: 'app-storage-card',
  templateUrl: './storage.component.html',
  styleUrls: ['../card.css', './storage.component.css'],
})
export class StorageComponent implements OnInit {
  private _refreshIntervalMs: number = refreshIntervals.Storage;
  private _intervalId!: number;
  private _blockDeviceInfo: BlockDeviceInfo = defaultBlockDeviceInfo;

  private _updateData() {
    this.telemetryService
      .fetchBlockDeviceInfo()
      .then((nextData: BlockDeviceInfo) => {
        this._blockDeviceInfo = nextData;
      });
  }

  constructor(private telemetryService: TelemetryService) {
    this._updateData();
  }

  ngOnInit(): void {
    this._intervalId = window.setInterval(() => {
      this._updateData();
    }, this._refreshIntervalMs);
  }

  get blockDeviceInfo(): BlockDeviceInfo {
    return this._blockDeviceInfo;
  }

  convertBStrtoGB = (sizeB: string): number => {
    return this.parseNumber(sizeB) / 1.049e9;
  };

  parseNumber(bigintStr: string): number {
    return Number.parseInt(bigintStr);
  }

  ngOnDestroy(): void {
    window.clearInterval(this._intervalId);
  }
}
