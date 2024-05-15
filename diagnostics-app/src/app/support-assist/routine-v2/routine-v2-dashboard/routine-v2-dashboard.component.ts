/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the CardContent Component in Routine V2.
 * Imported by routine-v2.module.ts
 */

import {Component, OnInit} from '@angular/core';

import {RoutineV2Service} from 'app/core/services/routine-v2.service';
import {VISIBLE_ROUTINE_V2_CARDS} from 'common/config/support-assist';
import {
  CreateRoutineArgumentsUnion,
  RoutineSupportStatus,
} from 'common/telemetry-extension-types/routines';

@Component({
  selector: 'app-routine-v2-dashboard',
  templateUrl: './routine-v2-dashboard.component.html',
  styleUrls: ['./routine-v2-dashboard.component.css'],
})
export class RoutineV2DashboardComponent implements OnInit {
  // The error message, undefined if no error occurs.
  public error?: string;

  // Array of routine-v2 arguments that will actually be displayed
  public supportedRoutines: CreateRoutineArgumentsUnion[] = [];

  public async isRoutineArgumentSupported(
    argument: CreateRoutineArgumentsUnion,
  ) {
    try {
      const supportStatusInfo =
        await this.RoutineV2Service.isRoutineArgumentSupported(argument);
      if (supportStatusInfo.status === RoutineSupportStatus.supported) {
        this.supportedRoutines.push(argument);
      }
    } catch (err) {
      this.error = String(err);
    }
  }

  public constructor(private RoutineV2Service: RoutineV2Service) {}

  ngOnInit(): void {
    for (const argument of VISIBLE_ROUTINE_V2_CARDS) {
      this.isRoutineArgumentSupported(argument);
    }
  }
}
