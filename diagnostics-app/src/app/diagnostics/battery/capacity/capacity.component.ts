// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the battery capacity component.
 * Imported by dashboard.module.ts
 */

import { Component, OnInit } from '@angular/core';
import { DiagnosticsResponse, DiagnosticsRoutineName } from '@common/message';
import { DiagnosticsService } from 'src/app/core/services/diagnostics.service';

@Component({
  selector: 'app-diagostics-battery-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.css'],
})
export class CapacityComponent implements OnInit {
  private _activeRoutine: DiagnosticsResponse | null = null;
  private _routineName = DiagnosticsRoutineName.RUN_BATTERY_CAPACITY_ROUTINE;

  constructor(private diagService: DiagnosticsService) {}

  get isRoutineActive(): boolean {
    return this._activeRoutine !== null;
  }

  get activeRoutine(): DiagnosticsResponse | null {
    return this._activeRoutine;
  }

  ngOnInit(): void {}

  async startRoutine() {
    this._activeRoutine = await this.diagService.runRoutine(this._routineName);
    console.log(this._activeRoutine);
  }

  async stopRoutine() {
    if (!this._activeRoutine) return;
    const routineId = this._activeRoutine.routineId;
    this._activeRoutine = await this.diagService.stopRoutine(routineId);
    window.setTimeout(() => {
      this._activeRoutine = null;
    }, 2000);
  }

  async resumeRoutine() {
    if (!this._activeRoutine) return;
    const routineId = this._activeRoutine.routineId;
    this._activeRoutine = await this.diagService.resumeRoutine(routineId);
  }

  async refreshRoutineStatus() {
    if (!this._activeRoutine) return;
    const routineId = this._activeRoutine.routineId;
    this._activeRoutine = await this.diagService.getRoutineStatus(routineId);
  }
}
