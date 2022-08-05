// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the SideNav Component.
 * Imported by app.module.ts
 */

import { Component, OnInit } from '@angular/core';

import {
  NavigationList,
  DASHBOARD_NAV_DATA,
  DIAGNOSTICS_NAV_DATA,
} from './side-nav.data';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  private _navLists: NavigationList[] = [
    DASHBOARD_NAV_DATA,
    DIAGNOSTICS_NAV_DATA,
  ];

  get navLists() {
    return this._navLists;
  }

  constructor() {}

  ngOnInit(): void {}
}
