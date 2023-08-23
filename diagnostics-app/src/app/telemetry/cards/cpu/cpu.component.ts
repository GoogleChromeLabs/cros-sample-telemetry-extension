// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the cpu card component for telemetry.
 * Imported by telemetry.module.ts
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CpuInfo, LogicalCpuInfo, CpuArchitectureEnum } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';
import refreshIntervals from '../../../core/config/data-refresh-intervals';

const defaultCpuInfo: CpuInfo = {
  numTotalThreads: 0,
  architecture: CpuArchitectureEnum.unknown,
  physicalCpus: [
    {
      modelName: 'unknown',
      logicalCpus: [
        {
          maxClockSpeedKhz: 0,
          scalingMaxFrequencyKhz: 0,
          scalingCurrentFrequencyKhz: 0,
          idleTimeMs: 0,
          cStates: [],
          coreId: 0,
        }
      ]
    }
  ],
}

@Component({
  selector: 'app-cpu-card',
  templateUrl: './cpu.component.html',
  styleUrls: ['../card.css', './cpu.component.css'],
})
export class CpuComponent implements OnInit, OnDestroy {
  private _refreshIntervalMs: number = refreshIntervals.Cpu;
  private _intervalId!: number;
  private _cpuData: CpuInfo = defaultCpuInfo;

  private _updateData() {
    this.telemetryService.fetchCpuInfo().then((value: CpuInfo) => {
      this._cpuData = value;
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

  get cpuData(): CpuInfo {
    return this._cpuData;
  }

  getLCpuUsagePercentage(lCpu: LogicalCpuInfo): number {
    if (!lCpu.scalingMaxFrequencyKhz || lCpu.scalingMaxFrequencyKhz === 0) return 0;
    return (
      (lCpu.scalingCurrentFrequencyKhz / lCpu.scalingMaxFrequencyKhz) * 100
    );
  }

  ngOnDestroy(): void {
    window.clearInterval(this._intervalId);
  }
}
