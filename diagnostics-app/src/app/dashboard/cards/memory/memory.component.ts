// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the memory card component for dashboard.
 * Imported by dashboard.module.ts
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemoryInfo } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';
import refreshIntervals from '../../../core/config/data-refresh-intervals';

const defaultMemoryData: MemoryInfo = {
  availableMemoryKib: 0,
  freeMemoryKib: 0,
  pageFaultsSinceLastBoot: '0',
  totalMemoryKib: 0,
};

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory.component.html',
  styleUrls: ['../card.css', './memory.component.css'],
})
export class MemoryComponent implements OnInit, OnDestroy {
  private refreshIntervalMs: number = refreshIntervals.Memory;
  private _intervalId!: number;
  private _memoryData: MemoryInfo = defaultMemoryData;

  private _updateData() {
    this.telemetryService.fetchMemoryInfo().then((nextData: MemoryInfo) => {
      this._memoryData = nextData;
    });
  }

  private _convertKiBtoGiB = (sizeKiB: number): number => {
    return sizeKiB / 1.049e6;
  };

  constructor(private telemetryService: TelemetryService) {
    this._updateData();
  }

  ngOnInit(): void {
    this._intervalId = window.setInterval(() => {
      this._updateData();
    }, this.refreshIntervalMs);
  }

  get memoryData(): MemoryInfo {
    return this._memoryData;
  }

  get totalMemoryGiB(): number {
    return this._convertKiBtoGiB(this.memoryData.totalMemoryKib);
  }

  get usedMemoryGiB(): number {
    return this._convertKiBtoGiB(
      this.memoryData.totalMemoryKib - this.memoryData.freeMemoryKib
    );
  }

  get percentageMemoryUsed(): number {
    if (this.totalMemoryGiB === 0) return 0;
    return (this.usedMemoryGiB / this.totalMemoryGiB) * 100;
  }

  ngOnDestroy(): void {
    window.clearInterval(this._intervalId);
  }
}
