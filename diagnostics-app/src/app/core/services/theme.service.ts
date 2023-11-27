// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Core service for managing theme related operations for the app.
 */

import {Subject, Subscription} from 'rxjs';
import {Inject, Injectable, Optional} from '@angular/core';
import {Theme} from '../enums/global.enums';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme!: Theme;
  private _themeChangedSource = new Subject<Theme>();

  constructor(@Inject('defaultTheme') @Optional() defaultTheme: Theme) {
    this._theme = defaultTheme || Theme.DARK;
  }

  public get theme(): Theme {
    return this._theme;
  }

  public subscribeOnThemeChange(cb: (theme: Theme) => void): Subscription {
    return this._themeChangedSource.subscribe(cb);
  }

  // executed by header component
  // publishes theme change events to entire app
  public toggleTheme() {
    this._theme = this._theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this._themeChangedSource.next(this._theme);
  }
}
