// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Defines the Header component.
 * Imported by app.module.ts
 */

import {Component, EventEmitter, Output} from '@angular/core';
import {Theme} from 'app/core/enums/global.enums';
import {ThemeService} from 'app/core/services/theme.service';
import {APP_NAME} from 'common/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleDrawer = new EventEmitter<void>();
  readonly appName = APP_NAME;

  public constructor(private _themeService: ThemeService) {}

  public onToggleTheme() {
    this._themeService.toggleTheme();
  }

  public onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  public isDarkModeActivated() {
    return this._themeService.theme === Theme.DARK;
  }
}
