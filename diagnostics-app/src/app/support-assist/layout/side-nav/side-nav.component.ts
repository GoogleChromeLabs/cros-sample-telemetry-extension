/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/**
 * @fileoverview Defines the SideNav Component.
 * Imported by app.module.ts
 */

import {Component, OnInit} from '@angular/core';

import {
  DIAGNOSTICS_NAV_DATA,
  EVENTS_NAV_DATA,
  NavigationItem,
  ROUTINE_V2_NAV_DATA,
  TELEMETRY_NAV_DATA,
} from './side-nav.data';

@Component({
  selector: 'support-assist-app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  public navLists: NavigationItem[] = [
    TELEMETRY_NAV_DATA,
    DIAGNOSTICS_NAV_DATA,
    EVENTS_NAV_DATA,
    ROUTINE_V2_NAV_DATA,
  ];

  public constructor() {}

  ngOnInit(): void {}
}
