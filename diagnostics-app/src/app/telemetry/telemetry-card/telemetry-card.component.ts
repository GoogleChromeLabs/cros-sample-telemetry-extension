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

  // The error message received, null if no error occurs.
  private _error?: ResponseErrorInfoMessage;
  // The interval id used for polling changes from healthd API.
  private _intervalId!: number;
  // The telemetry info received by calling telemetry service.
  private _info?: TelemetryInfoUnion;

  get error() {
    return this._error;
  }
  get info() {
    return this._info;
  }

  private _updateData(type: TelemetryInfoType) {
    const promise = <Promise<TelemetryInfoUnion>>(
      this.telemetryService.fetchTelemetryData(type)
    );
    promise
      .then((value: TelemetryInfoUnion) => {
        this._error = undefined;
        this._info = value;
      })
      .catch((e) => {
        this._error = e.message;
        this._info = undefined;
      });
  }

  public constructor(private telemetryService: TelemetryService) {}

  ngOnInit(): void {
    const type = this.type;
    const interval = refreshIntervals.telemetry.has(type)
      ? refreshIntervals.telemetry.get(type)
      : defaultTelemetryRefreshInterval;

    this._updateData(type);
    this._intervalId = window.setInterval(() => {
      this._updateData(type);
    }, interval);
  }

  ngOnDestroy(): void {
    window.clearInterval(this._intervalId);
  }
}
