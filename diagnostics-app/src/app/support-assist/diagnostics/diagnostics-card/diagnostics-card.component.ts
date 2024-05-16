/**
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the Card component for diagnostics.
 * Imported by diagnostics.module.ts
 */

import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {originalOrder} from 'app/core/app-utils';
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
} from 'common/telemetry-extension-types/legacy-diagnostics';

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

  // The error message, undefined if no error occurs.
  public error?: string;
  // The parameter for starting a routine.
  public params?: DiagnosticsParamsUnion;
  // Latest information received about the routine.
  public routineInfo?: GetRoutineUpdateResponse;
  // Current state  of the diagnostics card.
  public state: DiagnosticsCardState = DiagnosticsCardState.READY;

  // The interval id for polling routine state, undefined if no routine is
  // running.
  private intervalId?: number;
  // The routine id of the running routine, undefined if no routine is running.
  private routineId?: number;

  // Used in HTML template.
  public originalOrder = originalOrder;

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

  get messageColor() {
    switch (this.routineInfo?.status) {
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
      this.params = diagnosticsParams.get(this.routine);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  private handleResponse() {
    if (!this.routineInfo) {
      this.error = ResponseErrorInfoMessage.INVALID_DIAGNOSTICS_ROUTINE_INFO;
      return;
    }

    if (this.routineInfo.status === RoutineStatus.waiting_user_action) {
      this.state = DiagnosticsCardState.WAITING_FOR_USER_ACTION;
      return;
    }

    if (this.terminalStates.has(this.routineInfo.status)) {
      this.stopRoutine();
      return;
    }
  }

  public canResume() {
    return ResumableRoutines.includes(this.routine);
  }

  public async startRoutine() {
    try {
      let res = await this.diagnosticsService.startRoutine(
        this.routine,
        this.params,
      );
      res = res as RoutineUpdateResponse;
      this.state = DiagnosticsCardState.RUNNING;
      this.error = undefined;
      this.routineId = res.id;
      this.routineInfo = res.info;

      const interval = refreshIntervals.diagnostics.has(this.routine)
        ? refreshIntervals.diagnostics.get(this.routine)
        : defaultDiagnosticsRefreshInterval;
      this.intervalId = window.setInterval(() => {
        if (this.state === DiagnosticsCardState.RUNNING) {
          this.getRoutineStatus();
        }
      }, interval);

      this.handleResponse();
    } catch (err) {
      this.error = String(err);
    }
  }

  public async stopRoutine() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    // The routine is no longer running.
    if (this.state !== DiagnosticsCardState.RUNNING) {
      return;
    }

    try {
      this.state = DiagnosticsCardState.STOPPING;
      if (this.routineId === undefined) {
        throw 'Routine ID is undefined';
      }
      await this.diagnosticsService.stopRoutine(this.routineId);
      this.error = undefined;
    } catch (err) {
      this.error = String(err);
    }

    this.routineId = undefined;
    this.state = DiagnosticsCardState.READY;
  }

  public async resumeRoutine() {
    try {
      let res = await this.diagnosticsService.resumeRoutine(this.routineId!);
      res = res as RoutineUpdateResponse;
      this.state = DiagnosticsCardState.RUNNING;
      this.error = undefined;
      this.routineInfo = res.info;

      this.handleResponse();
    } catch (err) {
      this.error = String(err);
    }
  }

  public async getRoutineStatus() {
    try {
      let res = await this.diagnosticsService.getRoutineStatus(this.routineId!);
      res = res as RoutineUpdateResponse;
      this.error = undefined;
      this.routineInfo = res.info;
      this.handleResponse();
    } catch (err) {
      this.error = String(err);
    }
  }
}
