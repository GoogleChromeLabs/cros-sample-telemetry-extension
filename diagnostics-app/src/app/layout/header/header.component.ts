// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Header component.
 * Imported by app.module.ts
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { Theme } from 'src/app/core/enums/global.enums';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleDrawer = new EventEmitter<void>();

  constructor(private _themeService: ThemeService) {}

  onToggleTheme() {
    this._themeService.toggleTheme();
  }

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  isDarkModeActivated() {
    return this._themeService.theme === Theme.DARK;
  }
}
