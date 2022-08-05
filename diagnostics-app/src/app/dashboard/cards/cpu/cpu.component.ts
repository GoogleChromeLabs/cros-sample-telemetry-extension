// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the cpu card component for dashboard.
 * Imported by dashboard.module.ts
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CpuInfo, LogicalCpuInfo } from '@common/dpsl';
import { TelemetryService } from 'src/app/core/services/telemetry.service';
import refreshIntervals from '../../../core/config/data-refresh-intervals';

@Component({
  selector: 'app-cpu-card',
  templateUrl: './cpu.component.html',
  styleUrls: ['../card.css', './cpu.component.css'],
})
export class CpuComponent implements OnInit, OnDestroy {
  private _refreshIntervalMs: number = refreshIntervals.Cpu;
  private _intervalId!: number;
  private _cpuData!: CpuInfo;

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
