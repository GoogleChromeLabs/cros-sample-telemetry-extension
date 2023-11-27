// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Card Component in Telemetry.
 * Imported by telemetry.module.ts
 */

import {Component, Input, OnInit, OnDestroy} from '@angular/core';

import {TelemetryInfoUnion} from '@common/dpsl';
import {TelemetryService} from 'src/app/core/services/telemetry.service';
import {TelemetryInfoType, ResponseErrorInfoMessage} from '@common/message';
import {
  defaultTelemetryRefreshInterval,
  refreshIntervals,
} from '../../core/config/data-refresh-intervals';

@Component({
  selector: 'app-telemetry-card',
  templateUrl: './telemetry-card.component.html',
  styleUrls: ['./telemetry-card.component.css'],
})
export class TelemetryCardComponent implements OnInit, OnDestroy {
  @Input({required: true}) type!: TelemetryInfoType;

  private _error?: ResponseErrorInfoMessage; // the error message received, null if no error occurs
  private _intervalId!: number; // the interval id of this card component
  private _info?: TelemetryInfoUnion; // the telemetry info received by calling telemetry service

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

  constructor(private telemetryService: TelemetryService) {}

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
