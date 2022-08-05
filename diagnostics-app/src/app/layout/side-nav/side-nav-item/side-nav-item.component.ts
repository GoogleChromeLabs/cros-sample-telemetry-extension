// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the SideNavItem Component.
 * A dumb component which displays router navigation link.
 * Imported by app.module.ts
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.css'],
})
export class SideNavItemComponent implements OnInit {
  @Input() icon: string = 'widgets';
  @Input() link: string = '/';
  @Input() name: string = 'Unknown';
  constructor() {}

  ngOnInit(): void {}
}
