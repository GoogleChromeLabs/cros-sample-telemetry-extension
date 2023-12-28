// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Card Component in Telemetry.
 * Imported by telemetry.module.ts
 */

import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {
  defaultTelemetryRefreshInterval,
  refreshIntervals,
} from 'app/core/config/data-refresh-intervals';
import {TelemetryService} from 'app/core/services/telemetry.service';
import {
  ResponseErrorInfoMessage,
  TelemetryInfoType,
  TelemetryInfoUnion,
} from 'common/message';

@Component({
  selector: 'app-telemetry-card',
  templateUrl: './telemetry-card.component.html',
  styleUrls: ['./telemetry-card.component.css'],
})
export class TelemetryCardComponent implements OnInit, OnDestroy {
  @Input({required: true}) type!: TelemetryInfoType;

  // The error message, undefined if no error occurs.
  public error?: ResponseErrorInfoMessage;
  // The telemetry info received by calling telemetry service.
  public info?: TelemetryInfoUnion;

  // The interval id used for polling changes from healthd API.
  private intervalId!: number;

  private updateData(type: TelemetryInfoType) {
    const promise = <Promise<TelemetryInfoUnion>>(
      this.telemetryService.fetchTelemetryData(type)
    );
    promise
      .then((value: TelemetryInfoUnion) => {
        this.error = undefined;
        this.info = value;
      })
      .catch((e) => {
        this.error = e.message;
        this.info = undefined;
      });
  }

  public constructor(private telemetryService: TelemetryService) {}

  ngOnInit(): void {
    const type = this.type;
    const interval = refreshIntervals.telemetry.has(type)
      ? refreshIntervals.telemetry.get(type)
      : defaultTelemetryRefreshInterval;

    this.updateData(type);
    this.intervalId = window.setInterval(() => {
      this.updateData(type);
    }, interval);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.intervalId);
  }
}
