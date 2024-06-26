/**
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the Dashboard Component in Diagnostics.
 * This is the root layout component which holds the diagnostics dashboard.
 * Imported by diagnostics.module.ts
 */

import {Component, OnInit} from '@angular/core';

import {DiagnosticsService} from 'app/core/services/diagnostics.service';
import {VISIBLE_DIAGNOSTICS_CARDS} from 'common/config/support-assist';
import {
  GetAvailableRoutinesResponse,
  RoutineType,
} from 'common/telemetry-extension-types/legacy-diagnostics';

@Component({
  selector: 'app-diagnostics-dashboard',
  templateUrl: './diagnostics-dashboard.component.html',
  styleUrls: ['./diagnostics-dashboard.component.css'],
})
export class DiagnosticsDashboardComponent implements OnInit {
  // Array of diagnostics routine names that will be displayed if available.
  readonly allVisibleRoutines: RoutineType[] = VISIBLE_DIAGNOSTICS_CARDS;

  // The error message, undefined if no error occurs.
  public error?: string;
  // Array of available routines returned by healthd API.
  private availableRoutines: RoutineType[] = [];

  get visibleRoutines() {
    return this.allVisibleRoutines.filter((routine) =>
      this.availableRoutines!.includes(routine),
    );
  }

  public async getAvailableRoutines() {
    try {
      const response = await this.diagnosticsService.getAvailableRoutines();
      this.availableRoutines = (
        response as GetAvailableRoutinesResponse
      ).routines;
    } catch (err) {
      this.error = String(err);
    }
  }

  public constructor(private diagnosticsService: DiagnosticsService) {}

  ngOnInit(): void {
    this.getAvailableRoutines();
  }
}
