// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Dashboard Component in Diagnostics.
 * This is the root layout component which holds the diagnostics dashboard.
 * Imported by diagnostics.module.ts
 */

import { Component, OnInit } from '@angular/core';

import { GetAvailableRoutinesResponse, RoutineType } from '@common/dpsl';
import { DiagnosticsService } from 'src/app/core/services/diagnostics.service';

@Component({
  selector: 'app-diagnostics-dashboard',
  templateUrl: './diagnostics-dashboard.component.html',
  styleUrls: ['./diagnostics-dashboard.component.css']
})
export class DiagnosticsDashboardComponent implements OnInit {
  private _availableRoutines?: RoutineType[]; // the available routines response
  private _error?: string; // the error message received

  // Array of diagnostics routine names that will be displayed
  readonly _visibleRoutines: RoutineType[] = [
    RoutineType.ac_power,
    RoutineType.audio_driver,
    RoutineType.battery_charge,
    RoutineType.battery_discharge,
    RoutineType.cpu_cache,
    RoutineType.dns_resolution,
    RoutineType.power_button,
    RoutineType.sensitive_sensor,
  ];

  get error() { return this._error; }
  get visibleRoutines() {
    let routines;
    if (!this._availableRoutines) {
      this.getAvailableRoutines();
    } else {
      routines = this._visibleRoutines.filter(
        routine => this._availableRoutines!.includes(routine));
    }
    return routines;
  }

  async getAvailableRoutines() {
    try {
      const response = await this.diagnosticsService.getAvailableRoutines();
      this._availableRoutines = (response as GetAvailableRoutinesResponse).routines;
      this._error = undefined;
  
    } catch (err) {
      this._error = String(err);
    }
  }

  constructor(private diagnosticsService: DiagnosticsService) {}

  ngOnInit(): void {
    this.getAvailableRoutines();
  }
}
