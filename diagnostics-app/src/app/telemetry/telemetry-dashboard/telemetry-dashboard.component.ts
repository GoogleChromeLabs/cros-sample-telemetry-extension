// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Dashboard Component.
 * This is the root layout component which holds the dashboard.
 * Imported by dashboard.module.ts
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telemetry-dashboard',
  templateUrl: './telemetry-dashboard.component.html',
  styleUrls: ['./telemetry-dashboard.component.css'],
})
export class TelemetryDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
