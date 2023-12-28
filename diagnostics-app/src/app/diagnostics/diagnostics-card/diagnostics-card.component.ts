// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Card component for diagnostics.
 * Imported by diagnostics.module.ts
 */

import {KeyValue} from '@angular/common';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {
  defaultDiagnosticsRefreshInterval,
  refreshIntervals,
} from 'app/core/config/data-refresh-intervals';
import {diagnosticsParams} from 'app/core/config/diagnostics-params';
import {DiagnosticsService} from 'app/core/services/diagnostics.service';
import {
  DiagnosticsParamsUnion,
  ResponseErrorInfoMessage,
  RoutineUpdateResponse,
} from 'common/message';
import {
  GetRoutineUpdateResponse,
  RoutineStatus,
  RoutineType,
} from 'common/telemetry-extension-types';

enum DiagnosticsCardState {
  READY = 'ready',
  RUNNING = 'running',
  STOPPING = 'stopping',
  WAITING_FOR_USER_ACTION = 'waiting_for_user_action',
}

// All routines that may be resumed.
const ResumableRoutines = [
  RoutineType.ac_power,
  RoutineType.battery_charge,
  RoutineType.battery_discharge,
];

@Component({
  selector: 'app-diagnostics-card',
  templateUrl: './diagnostics-card.component.html',
  styleUrls: ['./diagnostics-card.component.css'],
})
export class DiagnosticsCardComponent implements OnInit, OnDestroy {
  @Input({required: true}) routine!: RoutineType;

  public DiagnosticsCardState = DiagnosticsCardState;

  // The error message received, undefined if no error occurs.
  private _error?: String;
  // The interval id for polling routine state, undefined if no routine is
  // running.
  private _intervalId?: number;
  // The parameter for starting a routine.
  private _params?: DiagnosticsParamsUnion;
  // The routine id of the running routine, undefined if no routine is running.
  private _routineId?: number;
  // Latest information received about the routine.
  private _routineInfo?: GetRoutineUpdateResponse;

  private _state: DiagnosticsCardState = DiagnosticsCardState.READY;
  // True if the routine reaches a state defined by `terminalStates`.
  private _reachedTerminalState = false;

  // Contains all states considered terminal states of RoutineStatus.
  readonly terminalStates = new Set<RoutineStatus>([
    RoutineStatus.passed,
    RoutineStatus.failed,
    RoutineStatus.error,
    RoutineStatus.cancelled,
    RoutineStatus.failed_to_start,
    RoutineStatus.removed,
    RoutineStatus.unsupported,
    RoutineStatus.not_run,
  ]);

  get error() {
    return this._error;
  }
  get intervalId() {
    return this._intervalId;
  }
  get params() {
    return this._params;
  }
  get routineInfo() {
    return this._routineInfo;
  }
  get state() {
    return this._state;
  }
  get messageColor() {
    switch (this._routineInfo?.status) {
      case RoutineStatus.passed:
        return 'green';
      case RoutineStatus.waiting_user_action:
        return 'yellow';
      default:
        return 'red';
    }
  }

  public constructor(private diagnosticsService: DiagnosticsService) {}

  ngOnInit(): void {
    if (diagnosticsParams.has(this.routine)) {
      this._params = diagnosticsParams.get(this.routine);
    }
  }

  ngOnDestroy(): void {
    if (this._intervalId) {
      window.clearInterval(this._intervalId);
    }
  }

  private handleResponse() {
    if (!this._routineInfo) {
      this._error = ResponseErrorInfoMessage.InvalidDiagnosticsRoutineInfo;
      return;
    }

    if (this._routineInfo.status === RoutineStatus.waiting_user_action) {
      this._state = DiagnosticsCardState.WAITING_FOR_USER_ACTION;
    } else if (this.terminalStates.has(this._routineInfo.status)) {
      this._reachedTerminalState = true;
      this.stopRoutine();
    }
  }

  // This function is used for maintaining the attributes' original order.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public originalOrder(
    _a: KeyValue<number, string>,
    _b: KeyValue<number, string>,
  ): number {
    return 0;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public canResume() {
    return ResumableRoutines.includes(this.routine);
  }

  public async startRoutine() {
    try {
      let res = await this.diagnosticsService.startRoutine(
        this.routine,
        this._params,
      );
      res = res as RoutineUpdateResponse;
      this._state = DiagnosticsCardState.RUNNING;
      this._error = undefined;
      this._routineId = res.id;
      this._routineInfo = res.info;

      const interval = refreshIntervals.diagnostics.has(this.routine)
        ? refreshIntervals.diagnostics.get(this.routine)
        : defaultDiagnosticsRefreshInterval;
      this._intervalId = window.setInterval(() => {
        if (this._state === DiagnosticsCardState.RUNNING) {
          this.getRoutineStatus();
        }
      }, interval);

      this.handleResponse();
    } catch (err) {
      this._error = String(err);
    }
  }

  public async stopRoutine() {
    if (this._intervalId) {
      window.clearInterval(this._intervalId);
      this._intervalId = undefined;
    }

    // The routine is no longer running.
    if (this._state !== DiagnosticsCardState.RUNNING) {
      return;
    }

    try {
      this._state = DiagnosticsCardState.STOPPING;
      if (this._routineId === undefined) {
        throw 'Routine ID is undefined';
      }
      await this.diagnosticsService.stopRoutine(this._routineId);
      this._error = undefined;
    } catch (err) {
      this._error = String(err);
    }

    this._routineId = undefined;
    this._reachedTerminalState = false;
    this._state = DiagnosticsCardState.READY;
  }

  public async resumeRoutine() {
    try {
      let res = await this.diagnosticsService.resumeRoutine(this._routineId!);
      res = res as RoutineUpdateResponse;
      this._state = DiagnosticsCardState.RUNNING;
      this._error = undefined;
      this._routineInfo = res.info;

      this.handleResponse();
    } catch (err) {
      this._error = String(err);
    }
  }

  public async getRoutineStatus() {
    try {
      let res = await this.diagnosticsService.getRoutineStatus(
        this._routineId!,
      );
      res = res as RoutineUpdateResponse;
      this._error = undefined;
      this._routineInfo = res.info;
      this.handleResponse();
    } catch (err) {
      this._error = String(err);
    }
  }
}
